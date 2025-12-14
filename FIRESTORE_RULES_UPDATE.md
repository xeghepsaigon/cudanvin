# Firestore Security Rules Update

## 🔴 IMPORTANT: You MUST update Firestore Rules

The onboarding feature requires updated Firestore security rules. Without these rules, you'll get "Missing or insufficient permissions" errors.

## Updated Security Rules for VinUrban

### Step 1: Go to Firebase Console

1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select your `vinurban` project
3. Go to **Build** → **Firestore Database**

### Step 2: Copy New Security Rules

Replace ALL content in the **Rules** tab with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - Allow users to create/read/update their own profile
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && request.auth.uid == userId;
      allow delete: if request.auth != null && request.auth.uid == userId;
    }

    // Vehicles collection
    match /vehicles/{vehicleId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.ownerId;
    }
    
    // Bookings collection
    match /bookings/{bookingId} {
      allow read: if request.auth.uid == resource.data.customerId 
                     || request.auth.uid == resource.data.ownerId;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.customerId 
                               || request.auth.uid == resource.data.ownerId;
    }
  }
}
```

### Step 3: Publish Rules

1. Click the **Publish** button (top right in Rules editor)
2. Confirm the update when prompted
3. Wait for rules to be deployed (usually 1-2 seconds)

### Step 4: Verify in Console

You should see a green checkmark and the message "Rules published successfully"

### Step 5: Test in Your App

1. Restart your dev server: `npm run dev`
2. Clear browser cache (Cmd+Shift+Delete on Mac / Ctrl+Shift+Delete on Windows)
3. Go to `http://localhost:3000/dang-nhap`
4. Sign in with Google
5. You should be redirected to the onboarding page
6. Fill in and submit the form

## Troubleshooting

### Still getting "Missing or insufficient permissions"?

1. **Clear browser storage:**
   - Open DevTools (F12)
   - Go to Application → Clear site data
   - Refresh the page

2. **Verify Firestore Rules were published:**
   - Go back to Firebase Console
   - Check Rules tab shows the new rules
   - Look for green checkmark

3. **Check your Firebase project:**
   - Make sure you're in the correct project (should say `vinurban` or similar)
   - Verify `.env.local` has correct `NEXT_PUBLIC_FIREBASE_PROJECT_ID`

4. **Check browser console for error details:**
   - Open DevTools → Console
   - Look for error message starting with "FirebaseError"
   - Copy the full error and check the error code

### Rules are published but still getting errors?

1. The Firestore rules may need a few seconds to take effect
2. Try waiting 30 seconds and refreshing
3. Try signing out and signing in again

## Security Note

These rules allow authenticated users to create and manage their own profiles. This is appropriate for user onboarding. For production, consider:
- Adding additional validation rules
- Implementing rate limiting
- Adding audit logging
- Using custom claims for role-based access control
