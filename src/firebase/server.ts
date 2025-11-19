// IMPORTANT: This file is meant for server-side code and should only be
// imported by server-side modules.
import { initializeApp, getApp, getApps, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { firebaseConfig } from './config';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (getApps().length) {
    return getSdks(getApp());
  }
  
  let app;
  try {
    // In a deployed GCP environment, initializeApp() discovers credentials automatically.
    app = initializeApp();
  } catch (e) {
    // In a local environment, you may need to specify the projectId.
    app = initializeApp({
        projectId: firebaseConfig.projectId,
    });
  }

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
