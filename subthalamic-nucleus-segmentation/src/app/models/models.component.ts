import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Model } from '../../app/helpers/models/model.model';
import { User } from '../../app/helpers/models/user.model';
import { ModelService } from '../helpers/services/model.service';
import { UserService } from '../helpers/services/user.service';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {

  form: FormGroup;

  failed = false;
  loading = false;
  submitted = false;

  model: Model;
  modelos: Model[] = [];
  users: User[] = [];
  actual_user: number;

  constructor(
    private modelService: ModelService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.modelService.getModels().subscribe(res => {this.modelos = res; console.log(res);});
    this.userService.getUsers().subscribe(res => {this.users = res;});
  }

  updateStatus(id: number, index: number, status: boolean): void{
    this.modelService.partialUpdate(id, {is_active: status}).subscribe(
      res => {
        this.model = this.modelos[index];
        this.model.is_active = res.is_active;
      }
    );
  }

  deleteModel(id: number): void{

  }

}