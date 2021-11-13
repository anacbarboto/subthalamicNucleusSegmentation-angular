import { Component, OnInit } from '@angular/core';
import { AuthService } from '../helpers/services/auth.service';
import { User } from '../helpers/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User;
  user_name: String;
  user_lastname: String;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user_name = JSON.parse(localStorage.getItem('first_name'));
    this.user_lastname = JSON.parse(localStorage.getItem('last_name'));
  }

  public logout(): void {
    this.authService.logout().subscribe();
  }

}
