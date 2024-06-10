import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, 
    { path: 'home', loadComponent: () => import('./features/home/home.component') },
    { path: 'join/:secret', loadComponent: () => import('./features/join/join.component'), data: { hideNavBar: true} },


];
