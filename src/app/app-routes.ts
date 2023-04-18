import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '', redirectTo: 'movies', pathMatch: 'full',
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./pages/movies/movies.routes')
        .then(m => m.MOVIES_ROUTES)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
