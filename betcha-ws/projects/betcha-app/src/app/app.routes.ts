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
    { path: 'scores', canActivate: [inAnyGroupGuard()], loadComponent: () => import('./features/scores/scores.component'), children: [
        {path: '', redirectTo: 'table', pathMatch: 'full'},
        {path: 'table', loadComponent: () => import('./features/scores/score-table/score-table.component')},
        {path: 'details', loadComponent: () => import('./features/scores/score-details/score-details.component')},
    ] },
    {path: 'info', loadComponent: () => import('./features/info/info.component'), children: [
        {path: '', redirectTo: 'rules', pathMatch: 'full'},
        {path: 'rules', loadComponent: () => import('./features/info/rules/rules.component')},
        {path: 'help', loadComponent: () => import('./features/info/help/help.component')},
    ]}


];
