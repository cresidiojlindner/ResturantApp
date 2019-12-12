import { Injectable } from '@angular/core';  
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Observable, throwError, of } from 'rxjs';  
import { catchError, map } from 'rxjs/operators';  
import { Resturant } from './resturant';  
  
@Injectable()  
export class ResturantService {  
  private resturantUrl = 'http://localhost:7071/api/';  
  
  constructor(private http: HttpClient) { }  
  
  getResturants(): Observable<Resturant[]> {  
    return this.http.get<Resturant[]>(this.resturantUrl + 'GetAllResturants')  
      .pipe(  
        catchError(this.handleError)  
      );  
  }  
  
  getResturant(id: string, zipCode: string): Observable<Resturant> {  
    console.log("id"+id);
    if (id === '') {  
      return of(this.initializeResturant());  
    }  
    const url = `${this.resturantUrl + 'Get'}/${id}/${zipCode}`;  
    return this.http.get<Resturant>(url)  
      .pipe(  
        catchError(this.handleError)  
      );  
  }  
  
  createResturant(resturant: Resturant): Observable<Resturant> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post<Resturant>(this.resturantUrl + 'CreateOrUpdateResturant', resturant, { headers: headers })  
      .pipe(  
        catchError(this.handleError)  
      );  
  }  
  
  deleteResturant(id: string, zipCode: string): Observable<{}> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    const url = `${this.resturantUrl + 'Delete'}/${id}/${zipCode}`;  
    return this.http.delete<Resturant>(url, { headers: headers })  
      .pipe(  
        catchError(this.handleError)  
      );  
  }  
  
  updateResturant(resturant: Resturant): Observable<Resturant> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    const url = this.resturantUrl + 'CreateOrUpdateResturant';  
    return this.http.put<Resturant>(url, resturant, { headers: headers })  
      .pipe(  
        map(() => resturant),  
        catchError(this.handleError)  
      );  
  }  
  
  private handleError(err) {  
    let errorMessage: string;  
    if (err.error instanceof ErrorEvent) {  
      errorMessage = `An error occurred: ${err.error.message}`;  
    } else {  
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;  
    }  
    console.error(err);  
    return throwError(errorMessage);  
  }  
  
  private initializeResturant(): Resturant {  
    return {  
      id: null,
      name: null,
      address1: null,
      address2: null,
      city: null,
      state: null,
      zipCode: null,
      description: null,
      rating: null,
      averageRating: null,
      ratingTotal: null,
      hours: null,
      numberOfTimesRated: null
    };  
  }  
}    