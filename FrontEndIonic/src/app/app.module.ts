import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';  //necesario para lanzar mis datos por medio de [NGModel]
import {HttpClientModule} from '@angular/common/http';//tambien se necesita importa HttpClientModule


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterPipe } from './pipes/filter.pipe';
import { AuxiliarPipe } from './pipes/auxiliar.pipe'; /// se importa en la pagina donde se va a usar no aca
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TicketPipe } from './pipes/ticket.pipe'; //necesario para las graficas



@NgModule({
  declarations: [AppComponent, TicketPipe],
  entryComponents: [],
  imports: [BrowserModule,
  IonicModule.forRoot(),
  AppRoutingModule,
  HttpClientModule,         //escribo aca el httpClientModule
  FormsModule,             //necesario ponerlo para enlazar datos con el objeto creado tipo interfaz
  ReactiveFormsModule,      /// en necesario para manejar las validaciones de formularios FormBuilder



],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
