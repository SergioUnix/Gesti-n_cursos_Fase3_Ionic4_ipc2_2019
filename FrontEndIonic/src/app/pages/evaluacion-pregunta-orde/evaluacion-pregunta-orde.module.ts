import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';  //instancio en esta pagina para utilizar FormGroup

import { EvaluacionPreguntaOrdePage } from './evaluacion-pregunta-orde.page';

const routes: Routes = [
  {
    path: '',
    component: EvaluacionPreguntaOrdePage
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
  declarations: [EvaluacionPreguntaOrdePage]
})
export class EvaluacionPreguntaOrdePageModule {}
