import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../../app/helpers/models/user.model';
import { UserService } from '../helpers/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  form: FormGroup;

  failed = false;
  loading = false;
  submitted = false;

  users: User[] = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(res => this.users = res);
  }

  deleteUser(id): void {

  }

  updateUser(id): void {
    
  }

}
