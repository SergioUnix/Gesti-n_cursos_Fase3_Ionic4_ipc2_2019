import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ActividadesVerNotasPage } from './actividades-ver-notas.page';

const routes: Routes = [
  {
    path: '',
    component: ActividadesVerNotasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ActividadesVerNotasPage]
})
export class ActividadesVerNotasPageModule {}
