import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Landlord} from '../models/landlord';
import {catchError, retry} from 'rxjs/operators';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // User endpoints
  basePath = 'http://localhost:3000/api/users';
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
  // Create User
  createUser(user): Observable<User> {
    return this.http.post<User>(`${this.basePath}`, JSON.stringify(user), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get User By Id
  getUserById(userId): Observable<User> {
    return this.http.get<User>(`${this.basePath}/${userId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update User
  updateUser(userId, user): Observable<User> {
    return this.http.put<User>(`${this.basePath}/${userId}`, JSON.stringify(user), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete User
  deleteUser(userId): Observable<any> {
    return this.http.delete(`${this.basePath}/${userId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
