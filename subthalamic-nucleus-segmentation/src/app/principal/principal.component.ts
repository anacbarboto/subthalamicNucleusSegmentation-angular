import { Component, OnInit } from '@angular/core';
import { ImageStatus } from '../helpers/enums/image.enum';
import { Image } from '../helpers/models/image.model';
import { ImageService } from '../helpers/services/image.service';

declare function setImage(url): any;
declare function overlay(url): any;
declare function clearImage(): any;

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  serverPath: string = "http://147.182.179.46/media/uploads/images/";

  segmentationResult: Image;

  showingImage: string = "";

  pathT1 = '';
  idT1: number;

  pathT2 = '';
  idT2: number;

  pathResult = '';

  imageT1: File;
  imageT2: File;
  imageResult: Image;

  t1Uploaded: boolean = true;
  t2Uploaded: boolean = true;
  showedImage: boolean = false;
  enableButton: boolean = true;
  segmentationDone: boolean = true;

  constructor(
    private imageService: ImageService,
  ) {}

  ngOnInit(): void 
  {
    ///this.showT1();
  }
  
  seleccionarT1(archivo: File): void{
    if(!archivo){
      this.imageT1=null;
      return
    }
    this.imageT1 = archivo;
  }

  seleccionarT2(archivo: File): void{
    if(!archivo){
      this.imageT2=null;
      return
    }
    this.imageT2 = archivo;
  }

  subirT1(): void{
    const userId = localStorage.getItem('id');

    const formDataT1 = new FormData();
    formDataT1.append('user', userId);
    formDataT1.append('path', this.imageT1);
    formDataT1.append('type', ImageStatus.T1);
    this.imageService.createImage(formDataT1).subscribe(res => {
      this.pathT1 = res.path.split('/')[res.path.split('/').length-1];
      this.idT1 = res.id;
      this.t1Uploaded = false;

      if (this.t2Uploaded == false && this.t1Uploaded == false){
        this.enableButton = false;
      }

      console.log(this.pathT1);
    },
    error => {
      this.enableButton = true;
    });
  }

  subirT2(): void{
    const userId = localStorage.getItem('id');

    const formDataT2 = new FormData();
    formDataT2.append('user', userId);
    formDataT2.append('path', this.imageT2);
    formDataT2.append('type', ImageStatus.T2);
    this.imageService.createImage(formDataT2).subscribe(res => {
      this.pathT2 = res.path.split('/')[res.path.split('/').length-1];
      this.idT2 = res.id;
      this.t2Uploaded = false;

      if (this.t2Uploaded == false && this.t1Uploaded == false){
        this.enableButton = false;
      }

      console.log(this.pathT2);
    },
    error => {
      this.enableButton = true;
    });
  }

  segmentar(): void{
    const formDataSegmentate = new FormData();
    formDataSegmentate.append('t1', '15112021002204IXIHH012.nii.gz');
    formDataSegmentate.append('t2', '15112021002214IXI012-HH-1211-T2_brain.nii.gz');
    this.imageService.getSegmentation(formDataSegmentate).subscribe(res => {
      this.pathResult = res.path.split('/')[res.path.split('/').length-1];
      this.segmentationDone = false;
      console.log(this.pathResult);
      this.showT2girada();
    },
    error => {
      console.log("ya fue");
    });
  }

  showT1(): void{
    if (this.showedImage)
    {
      clearImage();
    }else{
      this.showedImage = true;
    }
    console.log(this.serverPath+'1/'+this.pathT1);
    setImage(this.serverPath+'1/'+this.pathT1);
    ///setImage(this.serverPath+'2-giradas/14112021195505IXI248-HH-1972-T2_brain.nii');
  }

  showT2(): void{
    if (this.showedImage)
    {
      clearImage();
    }else{
      this.showedImage = true;
    }
    setImage(this.serverPath+'2/'+this.pathT2);
  }

  showT2girada(): void{
    if (this.showedImage)
    {
      clearImage();
    }else{
      this.showedImage = true;
    }
    setImage(this.serverPath+'2-giradas/'+this.pathT2);
  }

  showResult(): void{
    if (this.showedImage && this.segmentationDone)
    {
      clearImage();
    }else{
      this.showedImage = true;
    }
    overlay(this.serverPath+'3'+this.pathResult); ///result-15112021005632IXIHH012_1.nii');
  }

  downloadImage()
  {
    var link = document.createElement('a');        
    link.href = this.serverPath+'3/result-15112021002204IXIHH012.nii.gz';///+this.pathResult;
    link.click();
  }

  convertDataUrlToBlob(dataUrl): Blob {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], {type: mime});
  }
}
