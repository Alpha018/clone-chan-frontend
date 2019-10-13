import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.baseUrl;
  }

  getBoards() {
    return this.httpClient.get(`${this.url}/board`, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getStats() {
    return this.httpClient.get(`${this.url}/statistics`, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getLatestPost() {
    return this.httpClient.get(`${this.url}/thread/latest`, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getRandomImages() {
    return this.httpClient.get(`${this.url}/randomimages`, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
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
