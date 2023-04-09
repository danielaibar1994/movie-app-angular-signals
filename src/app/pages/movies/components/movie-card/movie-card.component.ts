import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/api/models/movie.interface';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {

  @Input() movie!: Movie;
  @Input() isDetail: boolean = false;

}
