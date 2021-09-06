import { Image } from './../models/image.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends ApiService{

  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  public getImages(params?): Observable<Image[]>{
    const options = this.authOptions; options.params = params;
    return this.http.get<Image[]>(`${this.API_URL}/images/`, options);
  }

  public createImage(image): Observable<any>{
    return this.http.post(`${this.API_URL}/images/`, image, this.authOptions);
  }
}
