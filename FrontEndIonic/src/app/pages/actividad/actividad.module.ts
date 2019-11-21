import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';  //instancio en esta pagina para utilizar FormGroup

import { IonicModule } from '@ionic/angular';

import { ActividadPage } from './actividad.page';

const routes: Routes = [
  {
    path: '',
    component: ActividadPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),    
    ReactiveFormsModule,  // se declara aca para que funcione el FormGroup
  ],
  declarations: [ActividadPage]
})
export class ActividadPageModule {}
