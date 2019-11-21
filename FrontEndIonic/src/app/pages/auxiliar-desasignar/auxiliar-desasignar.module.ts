import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuxiliarPipe } from '../../pipes/auxiliar.pipe'; /// se importa en la pagina donde se va a usar no aca

import { IonicModule } from '@ionic/angular';

import { AuxiliarDesasignarPage } from './auxiliar-desasignar.page';

const routes: Routes = [
  {
    path: '',
    component: AuxiliarDesasignarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AuxiliarDesasignarPage, AuxiliarPipe]
})
export class AuxiliarDesasignarPageModule {}
