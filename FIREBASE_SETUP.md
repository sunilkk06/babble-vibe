# Firebase Setup Guide

## Overview
ChirPolly uses Firebase for authentication and Firestore for user data storage.

## Configuration

### Environment Variables
Create a `.env.local` file in the project root with the following variables:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
GEMINI_API_KEY=your_gemini_api_key
```

**Note:** `.env.local` is gitignored for security. Never commit API keys to version control.

## Firebase Features Enabled

### Authentication Methods
- ✅ Email/Password authentication
- ✅ Google OAuth Sign-In
- ✅ Email verification
- ✅ Password reset functionality

### Firestore Database
- ✅ User collection with user profiles
- ✅ Security rules configured for user data privacy
- ✅ Server timestamps for audit trails

## Firestore Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
  }
}
```

## User Data Structure

Users are stored in Firestore with the following structure:

```json
{
  "uid": "user_id",
  "email": "user@example.com",
  "displayName": "User Name (optional)",
  "photoURL": "profile_photo_url (optional)",
  "provider": "google | password",
  "createdAt": "server_timestamp"
}
```

## Demo Mode

When Firebase credentials are not configured (missing `VITE_FIREBASE_API_KEY`), the app runs in demo mode:
- Auto-authenticates with a demo user
- Shows a console warning
- Allows testing without Firebase setup

To disable demo mode, ensure all Firebase environment variables are set in `.env.local`.

## Getting Started

1. Create Firebase project at https://console.firebase.google.com
2. Enable Authentication (Email/Password and Google)
3. Create Firestore Database
4. Copy Firebase config to `.env.local`
5. Run `npm run dev`

## Troubleshooting

**Issue:** "Firebase not configured" warning
- **Solution:** Ensure `.env.local` exists with all Firebase credentials

**Issue:** Google Sign-In not working
- **Solution:** Verify Google OAuth is enabled in Firebase Console → Authentication → Sign-in method

**Issue:** User data not saving
- **Solution:** Check Firestore security rules and ensure user is authenticated

## References
- [Firebase Console](https://console.firebase.google.com)
- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
