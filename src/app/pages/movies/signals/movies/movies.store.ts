import { signal } from "@angular/core";
import { Actor } from "src/app/api/models/actor.interface";
import { Company } from "src/app/api/models/company.interface";
import { Movie } from "src/app/api/models/movie.interface";

export const moviesSignal = signal<Movie[]>([]);
export const selectedMovieSignal = signal<Movie | undefined>(undefined);
export const actorsSignal = signal<Actor[]>([]);
export const companiesSignal = signal<Company[]>([]);

export const newMovieSignal = signal<Movie | undefined>(undefined);