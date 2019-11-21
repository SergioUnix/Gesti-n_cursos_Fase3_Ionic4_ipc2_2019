import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReporteAsistenciaPage } from './reporte-asistencia.page';
import { NgxChartsModule } from '@swimlane/ngx-charts';  //necesario para la graficas

const routes: Routes = [
  {
    path: '',
    component: ReporteAsistenciaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxChartsModule,
  ],
  declarations: [ReporteAsistenciaPage]
})
export class ReporteAsistenciaPageModule {}
