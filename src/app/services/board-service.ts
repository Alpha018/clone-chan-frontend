import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private readonly url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.baseUrl;
  }

  getThreadsPaginate(page: string, board: string = '') {
    return this.httpClient.get(`${this.url}/thread`, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      }),
      params: {
        page,
        board,
      }
    }).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getBoardsBySlug(slug: string) {
    return this.httpClient.get(`${this.url}/board/slug`, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      }),
      params: {
        slug,
      }
    }).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
