import { Component, OnInit } from '@angular/core';
import { Papaya } from 'papaya';
import { ImageStatus } from '../helpers/enums/image.enum';
import { Image } from '../helpers/models/image.model';
import { ImageService } from '../helpers/services/image.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  segmentationResult: Image;

  showingImage: string = "";

  pathT1 = '';
  idT1: number;

  pathT2 = '';
  idT2: number;

  imageT1: File;
  imageT2: File;
  imageResult: Image;

  t1Uploaded: boolean = false;
  t2Uploaded: boolean = false;
  enableButton: boolean = true;
  mostrar: boolean = true;

  objectURL;
  
  app = new Papaya();

  params: any = {
    "worldSpace": true,
    "images": ["http://147.182.179.46/media/uploads/images/1/IXIHH012.niiz"]
  };
  
  constructor(
    private imageService: ImageService,
  ) {}

  ngOnInit(): void 
  {
    this.app.constant('images', 'http://147.182.179.46/media/uploads/images/1/IXIHH012.nii')
    console.log(this.app);
  }

  seleccionarT1(archivo: File)
  {
    if(!archivo){
      this.imageT1=null;
      return
    }
    this.imageT1 = archivo;
    console.log('img', this.imageT1)
  }

  seleccionarT2(archivo: File)
  {
    if(!archivo){
      this.imageT2=null;
      return
    }
    this.imageT2 = archivo;
    console.log('img', this.imageT2)
  }

  segmentar()
  {
    const formDataSegmentate = new FormData();
    formDataSegmentate.append('t1', this.pathT1);
    formDataSegmentate.append('t2', this.pathT2);
    this.imageService.getSegmentation(formDataSegmentate).subscribe(res => {
      this.segmentationResult = res;
    }, 
    error => {
      console.log(error);
    });
  }

  subirImagenes()
  {
    const userId = localStorage.getItem('id');

    const formDataT1 = new FormData();
    formDataT1.append('user', userId);
    formDataT1.append('path', this.imageT1);
    formDataT1.append('type', ImageStatus.T1);
    this.imageService.createImage(formDataT1).subscribe(res => {
      this.pathT1 = res.path.split('/')[res.path.split('/').length-1];
      console.log(this.pathT1);
      this.idT1 = res.id;
      this.t1Uploaded = true;
      this.enableButton = false;
    },
    error => {
      this.enableButton = true;
    });

    const formDataT2 = new FormData();
    formDataT2.append('user', userId);
    formDataT2.append('path', this.imageT2);
    formDataT2.append('type', ImageStatus.T2);
    this.imageService.createImage(formDataT2).subscribe(res => {
      this.pathT2 = res.path.split('/')[res.path.split('/').length-1];
      this.idT2 = res.id;
      this.t2Uploaded = true;
      this.enableButton = false;
    },
    error => {
      this.enableButton = true;
    });
  }

  mostrarImagen()
  {
    this.objectURL = URL.createObjectURL(this.convertDataUrlToBlob(""));
    document.getElementsByClassName('papaya').item(this.objectURL);

   /// var myContainer = this.papayaContainers[0];
  }

  downloadImage()
  {/*
    this.imageService.getImage(63).subscribe(res => {
      this.pathT2 = res.path.split('/')[res.path.split('/').length-1];
      this.imageResult = res;
      ///console.log(this.pathT2);
      console.log(res);
    });*/

    var link = document.createElement('a');        
    link.href = "http://147.182.179.46/media/uploads/images/1/IXIHH012.nii";
    link.download = "plantilla-ajuste-programado.xlsx";
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
