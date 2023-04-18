import { Component, OnInit, inject } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Router } from '@angular/router';
import { moviesSignal } from 'src/app/pages/movies/signals/movies/movies.store';
import { Movie } from 'src/app/api/models/movie.interface';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { CommonModule, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, MovieCardComponent

  ],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  get movies(): Movie[] {
    return moviesSignal();
  }

  // constructor(private readonly service: MoviesService, private router: Router) { }

  private service = inject(MoviesService);
  private router = inject(Router);

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
