import { Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { authGuard, guestGuard } from './service/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage)
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.page').then( m => m.AuthPage),
    canActivate: [guestGuard],
    data: {authGuardPipe: redirectLoggedInTo(['/home-users'])}
  },
  {
    path: 'home-users',
    loadComponent: () => import('./pages/home-users/home-users.page').then( m => m.HomeUsersPage),
    canActivate: [authGuard],
    data: {authGuardPipe: redirectUnauthorizedTo(['/auth'])}
  },
  {
    path: 'children',
    loadComponent: () => import('./pages/children/children.page').then( m => m.ChildrenPage),
    canActivate: [authGuard],
    data: {authGuardPipe: redirectUnauthorizedTo(['/auth'])}
  }

];
