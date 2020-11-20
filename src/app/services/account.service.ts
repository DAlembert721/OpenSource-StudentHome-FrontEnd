import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Account} from '../models/account';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  basePath = 'http://localhost:3000/api';
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
  // Create Account
  createAccount(userId, account): Observable<Account> {
    return this.http.post<Account>(`${this.basePath}/users/${userId}/accounts`, JSON.stringify(account), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Account By Id and UserId
  getAccountByUserId(userId, accountId): Observable<Account> {
    return this.http.get<Account>(`${this.basePath}/users/${userId}/accounts/${accountId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Account
  updateAccount(accountId, userId, account): Observable<Account> {
    return this.http.put<Account>(`${this.basePath}/users/${userId}/accounts/${accountId}`, JSON.stringify(account), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Account
  deleteAccount(userId, accountId): Observable<any> {
    return this.http.delete(`${this.basePath}/users/${userId}/accounts/${accountId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
