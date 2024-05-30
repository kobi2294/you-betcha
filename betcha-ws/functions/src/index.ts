/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onCall } from 'firebase-functions/v2/https';
import { authorize } from './common/api/authorize';
import { getSuperApi } from './apis/super.api';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onCall({region: 'europe-west3'}, res => {
  const token = authorize.getAdminToken();
  const api = getSuperApi(token);
  return 'hello world';
});
