'use client';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): Promise<void> {
  // Although we don't block, returning the promise can be useful for chaining or error handling.
  return signInAnonymously(authInstance).then(() => {});
}

/**
 * Creates a new user with email and password.
 * This is an async function that should be awaited to handle completion and errors.
 * @param authInstance The Firebase Auth instance.
 * @param email The user's email.
 * @param password The user's password.
 */
export async function signUpWithEmailAndPassword(authInstance: Auth, email: string, password: string): Promise<void> {
  await createUserWithEmailAndPassword(authInstance, email, password);
}


/** Initiate email/password sign-in. Returns a promise for handling errors. */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): Promise<void> {
  // This returns the promise from signInWithEmailAndPassword, so the caller can use .catch()
  return signInWithEmailAndPassword(authInstance, email, password).then(() => {});
}
