import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Movie } from '../models/movie.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesRepository {

  private http = inject(HttpClient);

  // API path
  basePath = environment.apiUrl + '/movies';

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json'
    })
  };



  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


  // Create a new item
  createItem(item: any): Observable<Movie> {
    return this.http
      .post<Movie>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Get single Movie data by ID
  getItem(id: string): Observable<Movie> {
    return this.http
      .get<Movie>(this.basePath + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Get Movies data
  getList(): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(this.basePath)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Update item by id
  updateItem(id: string, item: Movie): Observable<Movie> {
    return this.http
      .put<Movie>(this.basePath + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Delete item by id
  deleteItem(id: string) {
    return this.http
      .delete<Movie>(this.basePath + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

}
