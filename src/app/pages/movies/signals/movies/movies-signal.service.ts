import { Injectable, inject } from '@angular/core';
import { Movie } from 'src/app/api/models/movie.interface';
import { Observable, combineLatest, first, retry, tap } from 'rxjs';
import { MoviesRepository } from 'src/app/api/services/movies.service';
import { ActorService } from 'src/app/api/services/actor.service';
import { CompanyService } from 'src/app/api/services/company.service';
import { Actor } from 'src/app/api/models/actor.interface';
import { Company } from 'src/app/api/models/company.interface';
import { actorsSignal, companiesSignal, moviesSignal, newMovieSignal, selectedMovieSignal } from './movies.store';

@Injectable({ providedIn: 'root' })
export class MoviesSignal {

    private repository = inject(MoviesRepository);
    private actorsRepository = inject(ActorService);
    private companiesRepository = inject(CompanyService);

    getMovies(): void { this.callMoviesList(); }

    getMovieDetail(id: string) { this.callMovieDetail(id); }

    setMovieDetail(movie: Movie, actors: Actor[], companies: Company[]): void {
        const actorsNames = movie.actors
            .map((actorId) => actors.find((actor) => actor.id === actorId))
            .filter((actor) => !!actor)
            .map((actor) => `${actor?.first_name} ${actor?.last_name}`);

        const companyName = movie.company && companies.find((company) => company.id.toString() === movie.company?.toString())?.name || '';

        selectedMovieSignal.set({ ...movie, actorsNames, companyName })
        actorsSignal.set(actors)
        companiesSignal.set(companies)
    }

    getActors(): void { this.callActorsList(); }

    getCompanies(): void { this.callCompaniesList(); }

    editMovie(id: number, movie: Movie): void { this.callEditMovie(id, movie); }

    saveMovie(movie: Movie): void { this.callSaveMovie(movie); }

    private callMoviesList(): void {
        this.repository.getList().pipe(
            retry(2),
            first(),
            tap((moviesData) => moviesSignal.set(moviesData))).subscribe();
    }


    private callMovieDetail(id: string): void {
        combineLatest([
            this.repository.getItem(id),
            this.actorsRepository.getList(),
            this.companiesRepository.getList()
        ]).pipe(
            tap(([movie, actors, companies]) => this.setMovieDetail(movie, actors, companies))
        ).subscribe();
    }

    private callActorsList(): void {
        this.actorsRepository.getList().pipe(
            retry(2),
            first(),
            tap((actors) => actorsSignal.set(actors))).subscribe();
    }


    private callCompaniesList(): void {
        this.companiesRepository.getList().pipe(
            retry(2),
            first(),
            tap((companies) => companiesSignal.set(companies))).subscribe();
    }

    private callEditMovie(id: number, movie: Movie): void {
        this.repository.updateItem(id.toString(), movie).pipe(
            retry(2),
            first(),
            tap((editedMovie) => { this.setMovieDetail(editedMovie, actorsSignal(), companiesSignal()) })).subscribe();
    }

    private callSaveMovie(movie: Movie): void {
        this.repository.createItem(movie).pipe(
            retry(2),
            first(),
            tap((movie) => { newMovieSignal.set(movie) })).subscribe();
    }

}