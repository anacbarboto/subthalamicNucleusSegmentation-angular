import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Image } from '../../app/helpers/models/image.model';
import { ImageService } from '../helpers/services/image.service';
import { Router } from '@angular/router';
import { ImageStatus } from '../helpers/enums/image.enum';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  form: FormGroup;

  failed = false;
  loading = false;
  submitted = false;

  images: Image[] = [];
  t1: boolean;

  constructor(
    private imageService: ImageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getT1();
  }

  get f(): any {
    return this.form.controls;
  }

  getT1(): void {
    this.t1 = true;
    this.imageService.getImages({type: ImageStatus.T1}).subscribe(res => this.images = res);
  }

  getT2(): void {
    this.t1 = false;
    this.imageService.getImages({type: ImageStatus.T2}).subscribe(res => this.images = res);
  }
}
