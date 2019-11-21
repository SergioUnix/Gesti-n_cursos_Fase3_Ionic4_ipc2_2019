import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';  //instancio en esta pagina para utilizar FormGroup

import { RegistroOlvidoRestablecerPage } from './registro-olvido-restablecer.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroOlvidoRestablecerPage
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
  declarations: [RegistroOlvidoRestablecerPage]
})
export class RegistroOlvidoRestablecerPageModule {}
