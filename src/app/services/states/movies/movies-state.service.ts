import { Injectable } from '@angular/core';
import { StateService } from '../default/state.service';
import { Movie } from 'src/app/api/models/movie.interface';
import { Observable, combineLatest, first, retry, tap } from 'rxjs';
import { MoviesService } from 'src/app/api/services/movies.service';
import { ActorService } from 'src/app/api/services/actor.service';
import { CompanyService } from 'src/app/api/services/company.service';
import { Actor } from 'src/app/api/models/actor.interface';
import { Company } from 'src/app/api/models/company.interface';

interface MovieState {
    movies: Movie[];
    selectedMovie: Movie | undefined,
    actors: Actor[];
    companies: Company[];
    newMovie: Movie | undefined,
}

const initialState: MovieState = {
    movies: [],
    selectedMovie: undefined,
    actors: [],
    companies: [],
    newMovie: undefined,
};

@Injectable({ providedIn: 'root' })
export class MoviesState extends StateService<MovieState> {
    constructor(
        private readonly repository: MoviesService,
        private readonly actorsRepository: ActorService,
        private readonly companiesRepository: CompanyService) {
        super(initialState);
    }

    // Selectors

    getMovies$(): Observable<Movie[]> {
        return this.select(state => state.movies);
    }

    getSelectedMovie$(): Observable<Movie | undefined> {
        return this.select(state => state.selectedMovie);
    }

    getActors$(): Observable<Actor[]> {
        return this.select(state => state.actors);
    }

    getCompanies$(): Observable<Company[]> {
        return this.select(state => state.companies);
    }

    getNewMovie$(): Observable<Movie | undefined> {
        return this.select(state => state.newMovie);
    }




    // Actions

    getMovies(): void {
        this.callMoviesList();
    }

    setMovies(movies: Movie[]): void {
        this.setMoviesState(movies);
    }

    getMovieDetail(id: string) {
        this.callMovieDetail(id);
    }

    setMovieDetail(movie: Movie, actors: Actor[], companies: Company[]): void {
        const actorsNames = movie.actors
            .map((actorId) => actors.find((actor) => actor.id === actorId))
            .filter((actor) => !!actor)
            .map((actor) => `${actor?.first_name} ${actor?.last_name}`);

        const companyName = movie.company && companies.find((company) => company.id.toString() === movie.company?.toString())?.name || '';

        this.setSelectedMovie({ ...movie, actorsNames, companyName });
        this.setActors(actors);
        this.setCompanies(companies);
    }

    getActors(): void {
        this.callActorsList();
    }

    setActors(actors: Actor[]): void {
        this.setActorsState(actors)
    }

    getCompanies(): void {
        this.callCompaniesList();
    }

    setCompanies(companies: Company[]): void {
        this.setCompaniesState(companies)
    }

    editMovie(id: number, movie: Movie): void {
        this.callEditMovie(id, movie);
    }

    saveMovie(movie: Movie): void {
        this.callSaveMovie(movie);
    }

    setNewMovie(movie: Movie): void {
        this.setNewMovieState(movie);
    }




    // Reducers

    private setMoviesState(movies: Movie[]): void {
        this.setState({ movies })
    }

    private setSelectedMovie(movie: Movie): void {
        this.setState({ selectedMovie: movie });
    }

    private setActorsState(actors: Actor[]): void {
        this.setState({ actors });
    }

    private setCompaniesState(companies: Company[]): void {
        this.setState({ companies });
    }

    private setNewMovieState(newMovie: Movie): void {
        this.setState({ newMovie })
    }




    // Effects

    private callMoviesList(): void {
        this.repository.getList().pipe(
            retry(2),
            first(),
            tap((movies) => { this.setMovies(movies) })).subscribe();
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

    private callEditMovie(id: number, movie: Movie): void {
        this.repository.updateItem(id.toString(), movie).pipe(
            retry(2),
            first(),
            tap((m) => { this.setMovieDetail(m, this.state.actors, this.state.companies) })).subscribe();
    }

    private callActorsList(): void {
        this.actorsRepository.getList().pipe(
            retry(2),
            first(),
            tap((actors) => { this.setActors(actors) })).subscribe();
    }


    private callCompaniesList(): void {
        this.companiesRepository.getList().pipe(
            retry(2),
            first(),
            tap((companies) => { this.setCompanies(companies) })).subscribe();
    }

    private callSaveMovie(movie: Movie): void {
        this.repository.createItem(movie).pipe(
            retry(2),
            first(),
            tap((movie) => { this.setNewMovieState(movie) })).subscribe();
    }

}