// IMPORTANT: This file is meant for server-side code and should only be
// imported by server-side modules.
import { initializeApp, getApp, getApps, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  // If the app is already initialized, return the existing SDKs.
  if (getApps().length) {
    return getSdks(getApp());
  }
  
  // In a Google Cloud environment (like App Hosting), initializeApp() automatically
  // discovers the service account credentials and project ID.
  // We do not need to pass any configuration.
  const app = initializeApp();

  return getSdks(app);
}

// Helper function to get the SDKs
function getSdks(app: App) {
  const firestore = getFirestore(app);
  // Optional: Apply settings if needed, e.g., for different regions.
  // firestore.settings({
  //   // your settings...
  // });
  
  return {
    app,
    auth: getAuth(app),
    firestore: firestore,
  };
}
