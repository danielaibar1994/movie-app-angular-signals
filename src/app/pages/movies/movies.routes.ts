import { Routes } from '@angular/router';
import { MoviesComponent } from './ui/movies-list/movies.component';
import { MovieDetailComponent } from './ui/movie-detail/movie-detail.component';
import { AddMovieComponent } from './ui/add-movie/add-movie.component';

export const MOVIES_ROUTES: Routes = [
  { path: '', component: MoviesComponent },
  { path: 'detail/:id', component: MovieDetailComponent },
  { path: 'new', component: AddMovieComponent },
];
