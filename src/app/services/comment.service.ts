import { Injectable } from '@angular/core';
import { Comment } from '../shared/comment';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestComment} from '../types/types';
import {catchError, retry} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  schema = Comment.init();
  private readonly url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.baseUrl;
  }

  putComment(data: RequestComment) {
    const formData = new FormData();
    formData.append('thread', data.thread);
    formData.append('comment', data.comment);
    if (data.file) { formData.append('image', data.file); }
    if (data.option) { formData.append('option', data.option); }

    return this.httpClient.put(`${this.url}/comment`, formData, {
      headers: new HttpHeaders({}),
    }).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getAllComments(id: string) {
    return this.httpClient.get(`${this.url}/comment`, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      }),
      params: {
        thread: id,
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
