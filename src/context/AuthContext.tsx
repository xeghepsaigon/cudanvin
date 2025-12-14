'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChange, AuthUser, signOutUser } from '@/lib/services/authService'
import { getUserProfile } from '@/lib/services/userService'

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  profileCompleted: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [profileCompleted, setProfileCompleted] = useState(false)

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChange(async (authUser) => {
      setUser(authUser)
      
      // Check if user profile is completed
      if (authUser) {
        try {
          const profile = await getUserProfile(authUser.uid)
          setProfileCompleted(profile?.profileCompleted || false)
        } catch (error: any) {
          // Handle Firebase permission errors gracefully
          if (error?.code === 'permission-denied') {
            console.warn('Firestore permission denied. Please update security rules.')
            // Treat as incomplete profile (redirect to onboarding)
            setProfileCompleted(false)
          } else {
            console.error('Error fetching user profile:', error)
            setProfileCompleted(false)
          }
        }
      } else {
        setProfileCompleted(false)
      }
      
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleSignOut = async () => {
    try {
      await signOutUser()
      setUser(null)
      setProfileCompleted(false)
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, profileCompleted, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
