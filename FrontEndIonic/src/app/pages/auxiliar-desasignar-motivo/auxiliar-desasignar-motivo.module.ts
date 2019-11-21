import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';  //instancio en esta pagina para utilizar FormGroup

import { IonicModule } from '@ionic/angular';

import { AuxiliarDesasignarMotivoPage } from './auxiliar-desasignar-motivo.page';

const routes: Routes = [
  {
    path: '',
    component: AuxiliarDesasignarMotivoPage
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
  declarations: [AuxiliarDesasignarMotivoPage]
})
export class AuxiliarDesasignarMotivoPageModule {}
