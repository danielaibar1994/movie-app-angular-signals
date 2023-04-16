import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/api/models/movie.interface';
import { actorsSignal, companiesSignal, selectedMovieSignal } from 'src/app/pages/movies/signals/movies/movies.store';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  get selectedMovie() {
    return selectedMovieSignal();
  }

  get actors() {
    return actorsSignal();
  }

  get companies() {
    return companiesSignal();
  }

  idMovie: string | null = '';

  isEditMode: boolean = false;

  constructor(private readonly service: MoviesService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.init();
  }

  changeEditMode(value: boolean) {
    this.isEditMode = value;
  }

  saveMovie(id: number, editMovie: Movie) {
    this.service.editMovie(id, editMovie);
    this.changeEditMode(false);
  }

  goToHome() {
    this.router.navigate(['movies']);
  }

  private init(): void {
    this.idMovie = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.idMovie) {
      this.service.getMovieDetail(this.idMovie)
    }
  }
}
