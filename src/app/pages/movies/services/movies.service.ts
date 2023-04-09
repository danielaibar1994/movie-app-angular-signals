import { Injectable } from '@angular/core';
import { Movie } from 'src/app/api/models/movie.interface';
import { MoviesState } from 'src/app/services/states/movies/movies-state.service';

@Injectable({ providedIn: 'root' })
export class MoviesService {
    movies$ = this.state.getMovies$();
    selectedMovie$ = this.state.getSelectedMovie$();
    actors$ = this.state.getActors$();
    companies$ = this.state.getCompanies$();
    newMovie$ = this.state.getNewMovie$();

    constructor(private readonly state: MoviesState) { }

    getData(): void {
        this.state.getMovies();
    }

    getMovieDetail(id: string): void {
        this.state.getMovieDetail(id);
    }

    getActors(): void {
        this.state.getActors();
    }

    getCompanies(): void {
        this.state.getCompanies();
    }

    editMovie(id: number, movie: Movie): void {
        this.state.editMovie(id, movie);
    }

    saveMovie(movie: Movie): void {
        this.state.saveMovie(movie);
    }

}