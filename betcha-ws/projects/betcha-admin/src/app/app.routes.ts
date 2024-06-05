import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./features/home/home-page/home-page.component')},
    { path: 'groups', loadComponent: () => import('./features/groups/groups-page/groups-page.component')},
    { path: 'matches', loadComponent: () => import('./features/matches/matches-page/matches-page.component')},
    { path: 'users', loadComponent: () => import('./features/users/users-page/users-page.component')},
];
