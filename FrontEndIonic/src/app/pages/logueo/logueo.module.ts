import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';  //instancio en esta pagina para utilizar FormGroup
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LogueoPage } from './logueo.page';

const routes: Routes = [
  {
    path: '',
    component: LogueoPage
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
  declarations: [LogueoPage]
})
export class LogueoPageModule {}
