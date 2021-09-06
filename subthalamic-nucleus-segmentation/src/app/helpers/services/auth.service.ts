import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { map, catchError } from 'rxjs/operators';
import { LoginResponse } from '../models/login.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService{

  constructor(
    private http: HttpClient,
    private router: Router) {
    super();
  }

  public login(username: string, password: string): Observable<LoginResponse> {
    const authData = btoa(`${username}:${password}`);
    console.log(authData);
    return this.http.post<LoginResponse>(`${this.API_URL}/login/`, {}, {
      headers: new HttpHeaders({
        Authorization: `Basic ${authData}`
      })
    }).pipe(
      map(response => {
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        console.log(response);
        return response;
      })
    );
  }

  public logout(): Observable<any> {
    return this.http.post(`${this.API_URL}/logout/`, {}, this.authOptions).pipe(
      map(res => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      })
    );
  }

  public isAuth(): Observable<boolean> {
    return this.http.get(`${this.API_URL}/auth/`, this.authOptions).pipe(
      map(res => true),
      catchError(err => {console.log(err); return of(false); })
    );
  }
}
