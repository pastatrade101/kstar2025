'use client';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): Promise<void> {
  // Although we don't block, returning the promise can be useful for chaining or error handling.
  return signInAnonymously(authInstance).then(() => {});
}

/**
 * Creates a new user with email and password, and sets up their user profile.
 * This is an async function that should be awaited to handle completion and errors.
 * @param authInstance The Firebase Auth instance.
 * @param email The user's email.
 * @param password The user's password.
 * @param displayName The user's full name.
 */
export async function signUpWithEmailAndPassword(authInstance: Auth, email: string, password: string, displayName?: string): Promise<UserCredential> {
  const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
  const user = userCredential.user;

  if (user) {
    // 1. Update the user's Auth profile
    if (displayName) {
      await updateProfile(user, { displayName });
    }

    // 2. Create the user's profile document in Firestore
    const firestore = getFirestore(authInstance.app);
    const userProfileRef = doc(firestore, 'users', user.uid);
    await setDoc(userProfileRef, {
      uid: user.uid,
      email: user.email,
      displayName: displayName || '',
      role: 'user', // Assign the default role
      createdAt: serverTimestamp(),
    });
  }

  return userCredential;
}


/** Initiate email/password sign-in. Returns a promise for handling errors. */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): Promise<void> {
  // This returns the promise from signInWithEmailAndPassword, so the caller can use .catch()
  return signInWithEmailAndPassword(authInstance, email, password).then(() => {});
}
