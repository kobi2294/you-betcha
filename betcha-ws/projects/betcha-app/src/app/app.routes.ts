import { Routes } from '@angular/router';
import { inAnyGroupGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, 
    { path: 'public', data: {public: true}, children: [
        { path: 'privacy', loadComponent: () => import('./other-pages/privacy-page/privacy-page.component') },
        { path: 'legal', loadComponent: () => import('./other-pages/legal-page/legal-page.component') },    
    ]},
    { path: 'home', loadComponent: () => import('./features/home/home.component') },
    { path: 'join/:secret', loadComponent: () => import('./features/join/join.component'), data: { hideNavBar: true} },
    { path: 'guesses', loadComponent: () => import('./features/guesses/guesses.component') },
    { path: 'profile', loadComponent: () => import('./features/profile/profile.component') },
    { path: 'scores', canActivate: [inAnyGroupGuard()], loadComponent: () => import('./features/scores/scores.component') },


];
