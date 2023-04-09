import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieDetailComponent } from './ui/movie-detail/movie-detail.component';
import { MoviesComponent } from './ui/movies-list/movies.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMovieComponent } from './ui/add-movie/add-movie.component';



@NgModule({
  declarations: [MoviesComponent, MovieCardComponent, MovieDetailComponent, EditMovieComponent, AddMovieComponent,],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MoviesModule { }
