/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { CallableOptions, onCall } from 'firebase-functions/v2/https';
import { getUserApi } from './apis/user.api';
import { initializeApp } from 'firebase-admin/app';
import { DbModel } from './common/public-api';


initializeApp();

const options: CallableOptions = {
  region: 'europe-west3',
} 

export const getUserDetails = onCall<void>(options, req => {
  const api = getUserApi(req.auth);
  return api.getUserDetails();  
});

export const getUserManagedGroups = onCall<DbModel.Group[]>(options, req => {
  const api = getUserApi(req.auth);
  return api.getManagedGroups();
});


