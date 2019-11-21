import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {UsuariosService} from './servicios/usuarios.service'; ///importo el servicio
import { Router } from '@angular/router'; // instancio para redirigir despues de logueo

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private usuariosService:UsuariosService,
    private router:Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }





  dark:boolean =true;
  public jeje=true;
  public admin_funcion=false;
  public auxiliar_funcion=false;
  public estudiante_funcion=false;

  ngOnInit() {
 this.checkTipo();

  }


checkTipo(){
  if (this.usuariosService.getSesionTipo()=='1') {
    this.admin_funcion = true; 
    this.auxiliar_funcion=true;
    this.estudiante_funcion=true;   
  } else if(this.usuariosService.getSesionTipo()=='2') {
    this.auxiliar_funcion = true;
    this.estudiante_funcion=false;   
  }else if(this.usuariosService.getSesionTipo()=='3') {
    this.estudiante_funcion = true;
    this.auxiliar_funcion=false;
}



}






  cerrarSesion(){
       
    this.usuariosService.OutSesion(); 
     
    this.router.navigate(['/logueo']);
   
 

  }


}
