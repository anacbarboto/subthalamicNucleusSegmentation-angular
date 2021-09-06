import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Model } from '../../app/helpers/models/model.model';
import { ModelService } from '../helpers/services/model.service';

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

  modelos: Model[] = [];

  constructor(
    private modelService: ModelService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.modelService.getModels().subscribe(res => this.modelos = res);
  }
}