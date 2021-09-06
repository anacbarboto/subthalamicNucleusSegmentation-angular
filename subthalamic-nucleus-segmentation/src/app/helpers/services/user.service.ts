import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService{

  constructor(
    private http: HttpClient,
    private router: Router) {
    super();
  }
  
   public getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.API_URL}/users/`, this.authOptions);
  }
}