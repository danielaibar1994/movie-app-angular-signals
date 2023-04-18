import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Actor } from '../models/actor.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  // API path
  basePath = environment.apiUrl + '/actors';

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json'
    })
  };

  private http = inject(HttpClient);

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
  createItem(item: any): Observable<Actor> {
    return this.http
      .post<Actor>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Get single Actor data by ID
  getItem(id: string): Observable<Actor> {
    return this.http
      .get<Actor>(this.basePath + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Get Actors data
  getList(): Observable<Actor[]> {
    return this.http
      .get<Actor[]>(this.basePath)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Get filtered actors data
  getFilteredList(filter: string): Observable<Actor[]> {
    return this.http
      .get<Actor[]>(this.basePath + filter)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Update item by id
  updateItem(id: string, item: any): Observable<Actor> {
    return this.http
      .put<Actor>(this.basePath + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Delete item by id
  deleteItem(id: string) {
    return this.http
      .delete<Actor>(this.basePath + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
