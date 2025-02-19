import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WelcomePageService {

  constructor(private http: HttpClient) { }

  getMeteoTunis(): Observable<{}> {
    const params = new HttpParams()
    .set('token', 'e7e0e21af2f0feb780e416e039e9c67ecd657fa001143551499466fdb64e83d3')
    .set('insee', '31555');
    const options = {
      params: params
    };

    const ApiKey = '63b86ccc6d55c58d81196cac6a504f01'
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=Tunis&appid=${ApiKey}&lang=fr&units=metric`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    )
  }


  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.log(error);
    return of(errorValue);
  }
}
