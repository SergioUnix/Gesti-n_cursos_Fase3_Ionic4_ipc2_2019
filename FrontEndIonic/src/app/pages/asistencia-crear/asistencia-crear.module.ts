import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AsistenciaCrearPage } from './asistencia-crear.page';

const routes: Routes = [
  {
    path: '',
    component: AsistenciaCrearPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AsistenciaCrearPage]
})
export class AsistenciaCrearPageModule {}
