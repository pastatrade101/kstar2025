// IMPORTANT: This file is meant for server-side code and should only be
// imported by server-side modules.
import { initializeApp, getApp, getApps, App, cert, ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { firebaseConfig } from './config';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  // Check if the app is already initialized
  if (getApps().length) {
    return getSdks(getApp());
  }

  // If not initialized, initialize with credentials
  // In a deployed environment, these credentials will be auto-discovered.
  // In a local environment, you may need to set GOOGLE_APPLICATION_CREDENTIALS.
  const app = initializeApp({
    projectId: firebaseConfig.projectId,
  });

  return getSdks(app);
}

// Helper function to get the SDKs
function getSdks(app: App) {
  return {
    app,
    auth: getAuth(app),
    firestore: getFirestore(app),
  };
}
