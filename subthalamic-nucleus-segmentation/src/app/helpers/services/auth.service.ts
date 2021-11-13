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

  formData: any = new FormData();

  credentials = {
    username: null,
    password: null,
  };

  constructor(
    private http: HttpClient,
    private router: Router) {
    super();
  }

  public login(username: string, password: string): Observable<LoginResponse> {
    this.credentials.username = username;
    this.credentials.password = password;

    return this.http.post<LoginResponse>(`${this.AUTH_URL}/login/`, this.credentials).pipe(
      map(response => {
        localStorage.setItem('id', JSON.stringify(response.id));
        localStorage.setItem('username', JSON.stringify(response.username));
        localStorage.setItem('first_name', JSON.stringify(response.first_name));
        localStorage.setItem('last_name', JSON.stringify(response.last_name));
        localStorage.setItem('token', response.token);
        return response;
      })
    );
  }

  public logout(): Observable<any> {
    return this.http.post(`${this.AUTH_URL}/logout/`, {}, this.authOptions).pipe(
      map(res => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      })
    );
  }

  public isAuth(): Observable<boolean> {
    return this.http.get(`${this.AUTH_URL}/auth/`, this.authOptions).pipe(
      map(res => true),
      catchError(err => {console.log(err); return of(false); })
    );
  }
}
