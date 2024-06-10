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
import * as functions from 'firebase-functions';
import { getAutomaticApi } from './apis/automatic.api';
import { authorize } from './common/api/authorize';


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

export const setGroupDisplayName = onCall<Api.SetGroupDisplayNameRequest, Promise<void>>(options, req => {
  const data = req.data;
  const api = getGroupAdminApi(req.auth, data.groupId);
  return api.setGroupDisplayName(data.displayName);
})

export const setGroupUsersLimit = onCall<Api.SetGroupUsersLimitRequest, Promise<void>>(options, req => {
  const data = req.data;
  const api = getSuperApi(req.auth);
  return api.setGroupUsersLimit(data.groupId, data.limit);
})

export const setGroupBlocked = onCall<Api.SetGroupBlockedRequest, Promise<void>>(options, req => {
  const data = req.data;
  const api = getSuperApi(req.auth);
  return api.setGroupBlocked(data.groupId, data.blocked);
})

export const customizeGroup = onCall<Api.CustomizeGroupRequest, Promise<void>>(options, req => {
  const data = req.data;
  const api = getGroupAdminApi(req.auth, data.groupId);

  const promises: Promise<void>[] = [];
  if (data.message !== undefined) promises.push(api.setGroupMessage(data.message));
  if (data.slogan !== undefined) promises.push(api.setGroupSlogan(data.slogan));
  if (data.theme !== undefined) promises.push(api.setGroupTheme(data.theme));

  return Promise.all(promises).then(() => {});
})

export const uploadGroupLogoImage = onCall<Api.UploadFileRequest, Promise<void>>(options, req => {
  const data = req.data;
  const api = getGroupAdminApi(req.auth, data.id);
  return api.uploadLogoImage(data.content, data.fileType);
})

export const addAdminToGroup = onCall<Api.AddRemoveGroupAdminRequest, Promise<void>>(options, req => {
  const data = req.data;
  const api = getSuperApi(req.auth);
  return api.addAdminToGroup(data.email, data.groupId);
})

export const removeAdminFromGroup = onCall<Api.AddRemoveGroupAdminRequest, Promise<void>>(options, req => {
  const data = req.data;
  const api = getSuperApi(req.auth);
  return api.removeAdminFromGroup(data.email, data.groupId);
})

export const searchUsers = onCall<string, Promise<DbModel.User[]>>(options, req => {
  const api = getSuperApi(req.auth);
  return api.searchUsers(req.data);
});

export const setUserRole = onCall<Api.SetUserRoleRequest, Promise<void>>(options, req => {
  const data = req.data;
  const api = getSuperApi(req.auth);
  return api.setUserRole(data.email, data.role);
});

export const updateMetadata = onCall<Partial<DbModel.Metadata>, Promise<void>>(options, req => {
  const api = getSuperApi(req.auth);
  return api.updateMetadata(req.data);
});

export const joinGroup = onCall<string, Promise<DbModel.Group>>(options, req => {
  const api = getUserApi(req.auth);
  return api.joinGroup(req.data);
});

export const userCreateTrigger = functions.auth.user().onCreate(async user => {
  const api = getAutomaticApi(authorize.upgrateToSuper(null));
  await api.onNewUserCreated(user);
});

export const setUserGuess = onCall<Api.SetUserGuessRequest, Promise<void>>(options, req => {
  const api = getUserApi(req.auth);
  return api.setGuess(req.data.matchId, req.data.guess);
});
