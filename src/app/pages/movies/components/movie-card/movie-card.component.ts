import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/api/models/movie.interface';
import { UiImageLoaderDirective } from 'src/app/shared/directives/not-image/image-loader.directive';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
  imports: [NgIf, NgFor, UiImageLoaderDirective],
})
export class MovieCardComponent {

  @Input() movie!: Movie;
  @Input() isDetail: boolean = false;

}
