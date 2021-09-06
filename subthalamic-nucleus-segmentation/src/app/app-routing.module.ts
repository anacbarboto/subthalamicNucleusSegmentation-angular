import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ModelsComponent } from './models/models.component';
import { ImagesComponent } from './images/images.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: 'modelos',
        component: ModelsComponent
      },
      {
        path: 'imagenes',
        component: ImagesComponent
      },
      {
        path: 'usuarios',
        component: UsersComponent
      },
      {
        path: 'principal',
        component: PrincipalComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
