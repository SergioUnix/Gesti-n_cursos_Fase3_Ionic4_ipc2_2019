import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';  //instancio en esta pagina para utilizar FormGroup

import { IonicModule } from '@ionic/angular';

import { AsignacionAuxiliarPage } from './asignacion-auxiliar.page';

const routes: Routes = [
  {
    path: '',
    component: AsignacionAuxiliarPage
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
  declarations: [AsignacionAuxiliarPage]
})
export class AsignacionAuxiliarPageModule {}
