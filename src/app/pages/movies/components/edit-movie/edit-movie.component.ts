import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Actor } from 'src/app/api/models/actor.interface';
import { Company } from 'src/app/api/models/company.interface';
import { Movie } from 'src/app/api/models/movie.interface';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  @Input() movie!: Movie;
  @Input() actors!: Actor[];
  @Input() companies!: Company[];

  @Output() cancelEvent = new EventEmitter<void>();
  @Output() saveEvent = new EventEmitter<Movie>();

  form!: FormGroup;
  submitted = false;

  genreInput = '';
  actorsInput = -1;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.init();
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const editMovie: Movie = { ...this.form.value }
    this.saveEvent.emit(editMovie);

    // console.log(JSON.stringify(this.form.value, null, 2));
  }

  onCancel(): void {
    this.cancelEvent.emit();
  }

  onReset(): void {
    this.submitted = false;
    this.actorsControl.clear();
    this.genresControl.clear();
    this.form.reset();
  }

  onEnter() {
    if (this.genreInput.length) {
      if (this.genresControl.value.some((genre: string) => genre === this.genreInput)) {
        console.error('Duplicated Genre');
        return;
      }
      this.genresControl.push(new FormControl(this.genreInput));
      this.genreInput = '';
    }
  }

  onEnterActor() {
    if (this.actorsControl.value.some((actor: number) => actor === +this.actorsInput)) {
      console.error('Duplicated Actor');
      return;
    }
    this.actorsControl.push(new FormControl(+this.actorsInput));
    this.actorsInput = -1;


  }

  removeActor(id: number): void {
    this.actorsControl.removeAt(id);
  }

  removeGenre(id: number): void {
    this.genresControl.removeAt(id);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get genresControl(): FormArray {
    return this.form.get("genre") as FormArray
  }

  get actorsControl(): FormArray {
    return this.form.get("actors") as FormArray
  }

  getActorName(id: number): string {
    const actor = this.actors.find((actor) => actor.id === id)
    return actor ? actor.first_name + ' ' + actor.last_name : id.toString();
  }

  private init() {
    this.form = this.formBuilder.group(
      {
        title: [this.movie.title, Validators.required],
        poster: [this.movie.poster, Validators.required],
        genre: this.formBuilder.array(this.movie.genre),
        year: [this.movie.year, Validators.required],
        duration: [this.movie.duration, Validators.required],
        imdbRating: [this.movie.imdbRating, Validators.required],
        actors: this.formBuilder.array(this.movie.actors),
        company: [this.movie.company, Validators.required]
      }
    );
  }

}
