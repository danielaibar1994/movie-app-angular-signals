/* eslint-disable @typescript-eslint/naming-convention */
export interface Movie {
    id: number;
    title: string;
    poster: string;
    genre: string[];
    year: number;
    duration: number;
    imdbRating: number;
    actors: number[];
    company?: number;

    actorsNames?: string[];
    companyName?: string;
}
