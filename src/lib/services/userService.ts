import { db } from '@/lib/firebase'
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  DocumentData,
} from 'firebase/firestore'

export interface UserProfile extends DocumentData {
  uid: string
  email: string
  displayName: string
  phoneNumber: string
  address: string
  profileCompleted: boolean
  createdAt: any
  updatedAt: any
  photoURL?: string
}

/**
 * Check if user profile exists in Firestore
 */
export async function userProfileExists(uid: string): Promise<boolean> {
  try {
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)
    return docSnap.exists()
  } catch (error) {
    console.error('Error checking user profile:', error)
    throw error
  }
}

/**
 * Get user profile from Firestore
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data() as UserProfile
    }
    return null
  } catch (error: any) {
    // If permission denied, profile doesn't exist yet
    if (error?.code === 'permission-denied') {
      console.warn('Permission denied reading user profile. User may be new.')
      return null
    }
    console.error('Error getting user profile:', error)
    throw error
  }
}

/**
 * Create initial user profile (after first login)
 */
export async function createUserProfile(
  uid: string,
  email: string,
  displayName: string | null,
  photoURL: string | null
): Promise<UserProfile> {
  try {
    const userProfile: UserProfile = {
      uid,
      email,
      displayName: displayName || '',
      phoneNumber: '',
      address: '',
      profileCompleted: false,
      photoURL: photoURL || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    await setDoc(doc(db, 'users', uid), userProfile)
    return userProfile
  } catch (error) {
    console.error('Error creating user profile:', error)
    throw error
  }
}

/**
 * Complete user profile (after onboarding)
 */
export async function completeUserProfile(
  uid: string,
  data: Partial<UserProfile>
): Promise<void> {
  try {
    const userRef = doc(db, 'users', uid)
    // Use setDoc with merge to create or update the document
    await setDoc(userRef, {
      ...data,
      profileCompleted: true,
      updatedAt: serverTimestamp(),
    }, { merge: true })
  } catch (error) {
    console.error('Error completing user profile:', error)
    throw error
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  uid: string,
  data: Partial<UserProfile>
): Promise<void> {
  try {
    const userRef = doc(db, 'users', uid)
    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error('Error updating user profile:', error)
    throw error
  }
}
