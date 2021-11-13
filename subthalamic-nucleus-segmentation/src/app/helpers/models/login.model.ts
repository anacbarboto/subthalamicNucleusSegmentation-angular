import { NumberValueAccessor } from '@angular/forms';
import { User } from './user.model';

export interface LoginResponse {
  id: string;
  token: string;
  username: string;
  first_name: string;
  last_name: string;
}
