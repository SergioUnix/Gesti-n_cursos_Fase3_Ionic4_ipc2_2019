import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';  

import { IonicModule } from '@ionic/angular';

import { CursoEditPage } from './curso-edit.page';

const routes: Routes = [
  {
    path: '',
    component: CursoEditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),    
  ],
  declarations: [CursoEditPage]
})
export class CursoEditPageModule {}
