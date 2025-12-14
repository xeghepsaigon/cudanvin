import {
  signInWithPopup,
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { userProfileExists, createUserProfile } from './userService'

export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  profileCompleted?: boolean
}

// Initialize Google provider
const googleProvider = new GoogleAuthProvider()

// Configure Google provider for Vietnamese locale
googleProvider.setCustomParameters({
  prompt: 'select_account',
})

/**
 * Sign in with Google
 */
export async function signInWithGoogle(): Promise<AuthUser> {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user

    // Check if user profile exists
    const profileExists = await userProfileExists(user.uid)

    // If profile doesn't exist, create initial profile for new user
    if (!profileExists) {
      await createUserProfile(
        user.uid,
        user.email || '',
        user.displayName,
        user.photoURL
      )
    }

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      profileCompleted: profileExists, // New users have incomplete profiles
    }
  } catch (error: any) {
    // Handle specific error codes
    if (error.code === 'auth/popup-blocked') {
      throw new Error('Popup bị chặn. Vui lòng kiểm tra cài đặt trình duyệt.')
    } else if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('Bạn đã đóng cửa sổ đăng nhập.')
    } else if (error.code === 'auth/operation-not-allowed') {
      throw new Error('Đăng nhập Google chưa được kích hoạt.')
    }
    throw error
  }
}

/**
 * Sign out
 */
export async function signOutUser(): Promise<void> {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

/**
 * Get current user
 */
export function getCurrentUser(): User | null {
  return auth.currentUser
}

/**
 * Listen to auth state changes
 */
export function onAuthStateChange(callback: (user: AuthUser | null) => void) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      callback({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      })
    } else {
      callback(null)
    }
  })
}
