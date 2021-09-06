import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpParams } from '@angular/common/http';

interface HttpOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  params?: HttpParams | {
      [param: string]: string | string[];
  };
}

export abstract class ApiService {
  AUTH_URL = `${environment.server}/auth`;
  API_URL = `${environment.server}/api`;

  get authOptions(): HttpOptions{
    return {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    };
  }
}
