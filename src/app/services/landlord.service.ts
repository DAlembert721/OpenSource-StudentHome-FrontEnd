import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Landlord} from '../models/landlord';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LandlordService {
  basePath = 'http://localhost:3000/api/landlords';
  constructor(private http: HttpClient) { }
  // Http Default Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };
  // API Error Handling
  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred: ', error.error.message);
    }
    else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }
  // Create Landlord
  createItem(item): Observable<Landlord> {
    return this.http.post<Landlord>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Landlord by Id
  getLandlordById(id): Observable<Landlord> {
    return this.http.get<Landlord>(`${this.basePath}/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Landlord Data
  getList(): Observable<Landlord>{
    return this.http.get<Landlord>(this.basePath)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Landlord
  updateLandlord(id, landlord): Observable<Landlord>{
    return this.http.put<Landlord>(`${this.basePath}/${id}`, JSON.stringify(landlord), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Landlord
  deleteItem(id): Observable<any> {
    return this.http.delete<Landlord>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
