import { Injectable, inject } from '@angular/core';
import { Movie } from 'src/app/api/models/movie.interface';
import { MoviesSignal } from 'src/app/pages/movies/signals/movies/movies-signal.service';

@Injectable({ providedIn: 'root' })
export class MoviesService {
  private store = inject(MoviesSignal);

  getData(): void {
    this.store.getMovies();
  }

  getMovieDetail(id: string): void {
    this.store.getMovieDetail(id);
  }

  getActors(): void {
    this.store.getActors();
  }

  getCompanies(): void {
    this.store.getCompanies();
  }

  editMovie(id: number, movie: Movie): void {
    this.store.editMovie(id, movie);
  }

  saveMovie(movie: Movie): void {
    this.store.saveMovie(movie);
  }
}
