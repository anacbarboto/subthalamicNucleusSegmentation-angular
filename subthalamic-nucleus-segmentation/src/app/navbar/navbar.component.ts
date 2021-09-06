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

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  public logout(): void {
    this.authService.logout().subscribe();
  }

}
