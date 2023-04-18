import { Component, OnInit, effect } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from 'src/app/api/models/movie.interface';
import { filter, tap } from 'rxjs';
import { Router } from '@angular/router';
import { actorsSignal, companiesSignal, newMovieSignal } from 'src/app/pages/movies/signals/movies/movies.store';
import { EditMovieComponent } from '../../components/edit-movie/edit-movie.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [EditMovieComponent, CommonModule],
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  e = effect((e) => this.checkNewMovie(newMovieSignal()));

  get newMovie() {
    return newMovieSignal();
  }

  get actors() {
    return actorsSignal();
  }

  get companies() {
    return companiesSignal();
  }

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
