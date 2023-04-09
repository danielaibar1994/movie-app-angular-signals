import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies$ = this.service.movies$;

  constructor(private readonly service: MoviesService, private router: Router) { }

  ngOnInit(): void {
    this.service.getData();
  }

  navigateNewMovie(): void {
    this.router.navigate(['movies', 'new']);
  }

}
