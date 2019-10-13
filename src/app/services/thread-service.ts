import { Injectable } from '@angular/core';
import {Thread} from '../shared/thread';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {RequestThread} from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  schema = Thread.init();
  private readonly url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.baseUrl;
  }

  putThread(data: RequestThread) {
    const formData = new FormData();
    formData.append('image', data.file);
    formData.append('board', data.board);
    formData.append('comment', data.comment);
    if (data.option) { formData.append('option', data.option); }
    formData.append('title', data.title);

    return this.httpClient.put(`${this.url}/thread`, formData, {
      headers: new HttpHeaders({}),
    }).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getThreadCommentById(id: string) {
    return this.httpClient.get(`${this.url}/threadById`, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      }),
      params: {
        id,
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
