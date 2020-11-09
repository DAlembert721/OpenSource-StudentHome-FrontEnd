import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Property} from '../models/property';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  basePath = 'http://localhost:3000/api';
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
  // Create Property
  createProperty(landlordId, property): Observable<Property> {
    return this.http.post<Property>(`${this.basePath}/landlords/${landlordId}/properties`, JSON.stringify(property), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get all Properties
  getProperty(): Observable<Property> {
    return this.http.get<Property>(`${this.basePath}/properties`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Properties by LandlordId
  getPropertiesByLandlordId(landlordId): Observable<Property>{
    return this.http.get<Property>(`${this.basePath}/landlords/${landlordId}/properties`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Property
  updateProperty(id, item): Observable<Property>{
    return this.http.put<Property>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Property
  deleteProperty(id): Observable<any> {
    return this.http.delete<Property>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
