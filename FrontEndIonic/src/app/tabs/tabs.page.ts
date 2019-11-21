import { Component } from '@angular/core';
import {UsuariosService} from '../servicios/usuarios.service'; ///importo el servicio
import { Router } from '@angular/router'; // instancio para redirigir despues de logueo

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(

    private usuariosService:UsuariosService,
    private router:Router
  ) {}


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
   

}
