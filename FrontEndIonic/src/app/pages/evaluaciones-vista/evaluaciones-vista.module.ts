import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EvaluacionesVistaPage } from './evaluaciones-vista.page';

const routes: Routes = [
  {
    path: '',
    component: EvaluacionesVistaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EvaluacionesVistaPage]
})
export class EvaluacionesVistaPageModule {}
