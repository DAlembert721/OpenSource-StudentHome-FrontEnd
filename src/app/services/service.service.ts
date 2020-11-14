import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Service} from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  basePath = 'https://student-home-open-source.herokuapp.com/api';
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };
  // API Error Handling
  handleError(error: HttpErrorResponse): Observable < never > {
    if (error.error instanceof  ErrorEvent) {
    console.log('An error has occurred: ', error.error.message);
    }
    else {
    console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }
  // Get Service
getServiceById(serviceId): Observable < Service > {
    return this.http.get<Service>(`${this.basePath}/services/${serviceId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get All Services
getServices(): Observable < Service > {
    return this.http.get<Service>(`${this.basePath}/services/`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Services By Property
getServiceByPropertyId(propertyId): Observable < Service > {
    return this.http.get<Service>(`${this.basePath}/properties/${propertyId}/services`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
