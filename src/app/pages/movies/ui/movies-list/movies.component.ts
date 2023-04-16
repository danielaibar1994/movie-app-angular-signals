import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Router } from '@angular/router';
import { moviesSignal } from 'src/app/pages/movies/signals/movies/movies.store';
import { Movie } from 'src/app/api/models/movie.interface';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  get movies(): Movie[] {
    return moviesSignal();
  }

  constructor(private readonly service: MoviesService, private router: Router) { }

  ngOnInit(): void {
    this.service.getData();
  }

  navigateNewMovie(): void {
    this.router.navigate(['movies', 'new']);
  }

  navigateToMovie(id: number): void {
    this.router.navigate(['movies', 'detail', id]);
  }

}
