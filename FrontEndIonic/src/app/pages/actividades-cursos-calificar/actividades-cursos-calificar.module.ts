import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ActividadesCursosCalificarPage } from './actividades-cursos-calificar.page';

const routes: Routes = [
  {
    path: '',
    component: ActividadesCursosCalificarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ActividadesCursosCalificarPage]
})
export class ActividadesCursosCalificarPageModule {}
