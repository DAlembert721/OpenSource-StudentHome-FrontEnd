import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Comment} from '../models/comment';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  // Contract endpoints
  basePath = 'https://student-home-open-source.herokuapp.com/api';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };
  // API Error Handling
  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof  ErrorEvent) {
      console.log('An error has ocurred: ', error.error.message);
    }
    else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }
  // Get All Comments By Property
  getAllCommentsByPropertyId(propertyId): Observable<Comment> {
    return this.http.get<Comment>(`${this.basePath}/properties/${propertyId}/comments`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
