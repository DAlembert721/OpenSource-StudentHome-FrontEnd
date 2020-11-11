import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Request} from '../models/request';
import {catchError, retry} from 'rxjs/operators';
import {Contract} from '../models/contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

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
  // Create Contract
  createContract(studentId, propertyId, contract): Observable<Contract> {
    return this.http.post<Contract>(`${this.basePath}/students/${studentId}/properties/${propertyId}/contracts`
      , JSON.stringify(contract), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Contract By StudentId
  getContractsByStudentId(studentId): Observable<Contract> {
    return this.http.get<Contract>(`${this.basePath}/students/${studentId}/contracts`
      , this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Contract By PropertyId
  getContractsByPropertyId(propertyId): Observable<Contract> {
    return this.http.get<Contract>(`${this.basePath}/properties/${propertyId}/contracts`
      , this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Contract
  updateContract(contractsId, contract): Observable<Contract> {
    return this.http.put<Contract>(`${this.basePath}/contracts/${contractsId}`
      , JSON.stringify(contract), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Request
  deleteContract(contractsId): Observable<any> {
    return this.http.delete(`${this.basePath}/contracts/${contractsId}`
      , this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
