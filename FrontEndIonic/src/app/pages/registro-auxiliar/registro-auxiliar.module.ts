import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';  //instancio en esta pagina para utilizar FormGroup
import { FilterPipe } from '../../pipes/filter.pipe';
import { IonicModule } from '@ionic/angular';

import { RegistroAuxiliarPage } from './registro-auxiliar.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroAuxiliarPage
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
  declarations: [RegistroAuxiliarPage, FilterPipe]
})
export class RegistroAuxiliarPageModule {}
