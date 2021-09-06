import { Model } from './../models/model.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ModelService extends ApiService{

  constructor(
    private http: HttpClient,
    private router: Router) {
    super();
  }
  
   public getModels(): Observable<Model[]>{
    return this.http.get<Model[]>(`${this.API_URL}/models/`, this.authOptions);
  }
}
