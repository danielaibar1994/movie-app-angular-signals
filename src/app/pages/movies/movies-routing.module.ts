import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './ui/movies-list/movies.component';
import { MovieDetailComponent } from './ui/movie-detail/movie-detail.component';
import { AddMovieComponent } from './ui/add-movie/add-movie.component';

const routes: Routes = [
  { path: '', component: MoviesComponent },
  { path: 'detail/:id', component: MovieDetailComponent },
  { path: 'new', component: AddMovieComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
