import { Routes } from '@angular/router';
import {
  adminOfGroupGuard,
  permissionGuard,
  roleGuard,
} from './guards/permission.guard';
import { GroupDetailsStore } from './features/groups/group-details/store/group-details.store';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home-page/home-page.component'),
  },
  {
    path: 'groups',
    canActivateChild: [permissionGuard((p) => p.canManageGroups)],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/groups/groups-page/groups-page.component'),
      },
      {
        path: 'add',
        canActivate: [roleGuard('super')],
        loadComponent: () =>
          import('./features/groups/add-group/add-group.component'),
      },
      {
        path: 'details/:groupId',
        canActivateChild: [adminOfGroupGuard()],
        children: [
          {
            path: '',
            providers: [GroupDetailsStore],
            children: [
              {
                path: '',
                loadComponent: () =>
                  import(
                    './features/groups/group-details/group-details.component'
                  ),
              },
              {
                path: 'admins',
                canActivate: [roleGuard('super')],
                loadComponent: () =>
                  import(
                    './features/groups/group-admins/group-admins.component'
                  ),
              },
              {
                path: 'users', 
                loadComponent: () => import('./features/groups/group-users/group-users.component')
              }
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'metadata',
    canActivate: [permissionGuard((p) => p.canManageMetadata)],
    loadComponent: () =>
      import('./features/metadata/metadata-page/metadata-page.component'),
  },
  {
    path: 'matches',
    canActivate: [permissionGuard((p) => p.canManageMatches)],
    loadComponent: () =>
      import('./features/matches/matches-page/matches-page.component'),
  },
  {
    path: 'users',
    canActivate: [permissionGuard((p) => p.canManageUsers)],
    loadComponent: () =>
      import('./features/users/users-page/users-page.component'),
  },
];
