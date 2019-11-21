import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HorarioFormPage } from './horario-form.page';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';  //instancio en esta pagina para utilizar FormGroup


const routes: Routes = [
  {
    path: '',
    component: HorarioFormPage
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
  declarations: [HorarioFormPage]
})
export class HorarioFormPageModule {}
