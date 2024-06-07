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
import { Api, DbModel } from './common/public-api';
import { CreateGroupRequest } from './common/models/api/create-group.api';
import { getSuperApi } from './apis/super.api';
import { getGroupAdminApi } from './apis/group-admin.api';


initializeApp();

const options: CallableOptions = {
  region: 'europe-west3',
} 

export const getUserDetails = onCall<void, Promise<DbModel.User>>(options, req => {
  const api = getUserApi(req.auth);
  return api.getUserDetails();  
});

export const getUserManagedGroups = onCall<void, Promise<Api.GroupInfo[]>>(options, req => {
  const api = getUserApi(req.auth);
  return api.getManagedGroups();
});

export const createGroup = onCall<CreateGroupRequest, Promise<void>>(options, req => {
  const api = getSuperApi(req.auth);
  const data = req.data;
  return api.createGroup(data.id, data.displayName);
})

export const isGroupIdFree = onCall<string, Promise<boolean>>(options, req => {
  const api = getSuperApi(req.auth);
  return api.isGroupIdFree(req.data);
})

export const getGroupForAdmin = onCall<string, Promise<Api.GetGroupForAdminResponse>>(options, req => {
  const groupId = req.data;
  const api = getGroupAdminApi(req.auth, groupId);
  return api.getGroupForAdmin();
})


