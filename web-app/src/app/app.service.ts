import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
  })
export class AppRestService {
    private add_price_detail_data_url = 'http://172.16.7.35:3000/add_details';
    private get_price_detail_data_url = 'http://172.16.7.35:3000/get_details';
    private update_price_detail_data_url = 'http://172.16.7.35:3000/update_details';
    private calculate_price_detail_price_url = 'http://172.16.7.35:3000/calculate_price_details';


    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
    constructor(private http: HttpClient) { }
    createHeader() {
        
    }

    getProduct(): Observable<any> {
        return this.http.get(this.get_price_detail_data_url, this.httpOptions).pipe(
          map(this.extractData));
    }
      
    addProduct (product): Observable<any> {
        return this.http.post<any>(this.add_price_detail_data_url, JSON.stringify(product), this.httpOptions).pipe(
          tap(),
          catchError(this.handleError<any>('addProduct'))
        );
    }

    updateProduct (product): Observable<any> {
      return this.http.post<any>(this.update_price_detail_data_url, JSON.stringify(product), this.httpOptions).pipe(
        tap(),
        catchError(this.handleError<any>('addProduct'))
      );
    }

    calculateProductPrice (product): Observable<any> {
      return this.http.post<any>(this.calculate_price_detail_price_url, JSON.stringify(product), this.httpOptions).pipe(
        tap(),
        catchError(this.handleError<any>('addProduct'))
      );
    }

    private extractData(res: Response) {
        let body = res;
        return body || { };
    }
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
      
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
      
          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);
      
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }
}