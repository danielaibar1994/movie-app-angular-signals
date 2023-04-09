import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from 'src/app/api/models/movie.interface';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  actors$ = this.service.actors$;
  companies$ = this.service.companies$;

  newMovie$ = this.service.newMovie$.pipe(tap((movie) => { this.checkNewMovie(movie) })).subscribe();

  movie: Movie = {
    id: -1,
    title: '',
    poster: '',
    genre: [],
    actors: [],
    company: undefined,
    year: 2000,
    duration: 0,
    imdbRating: 0
  }

  constructor(private readonly service: MoviesService, private router: Router) { }

  ngOnInit(): void {
    this.init();
  }

  cancel() {
    this.router.navigate(['movies']);
  }

  saveMovie(editMovie: Movie) {
    this.service.saveMovie(editMovie);
  }


  private init() {
    this.service.getActors();
    this.service.getCompanies();
  }

  private checkNewMovie(movie: Movie | undefined): void {
    if (movie?.id) {
      this.router.navigate(['movies', 'detail', movie.id]);
    }
  }

}
