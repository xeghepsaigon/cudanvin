// Firebase Configuration
// TODO: Replace with your actual Firebase config
// Get values from: https://console.firebase.google.com/project/YOUR_PROJECT/settings/general

import type { FirebaseApp } from 'firebase/app'
import type { Auth } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore'
import type { FirebaseStorage } from 'firebase/storage'

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || ''
}

// Initialize Firebase when config is provided
export let app: FirebaseApp | null = null
export let auth: Auth | null = null
export let db: Firestore | null = null
export let storage: FirebaseStorage | null = null

if (firebaseConfig.projectId) {
  // Dynamic import to avoid build errors if Firebase not installed
  try {
    const { initializeApp } = require('firebase/app')
    const { getAuth } = require('firebase/auth')
    const { getFirestore } = require('firebase/firestore')
    const { getStorage } = require('firebase/storage')

    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)
    storage = getStorage(app)
  } catch (error) {
    console.warn('Firebase not initialized. Install firebase package and set environment variables.')
  }
}
