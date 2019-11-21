import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../servicios/usuarios.service'; ///importo el servicio
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Asig_Estu} from 'src/app/modelos/Asig_Estu';
import { FormGroup, FormBuilder,FormControl, Validators, NgForm } from '@angular/forms';
import { SeccionService} from 'src/app/servicios/seccion.service';
import { HorariosService } from 'src/app/servicios/horarios.service';
import { CursosService } from 'src/app/servicios/cursos.service';
import { AsigEstuService } from 'src/app/servicios/asig-estu.service';
import { AsigAuxService } from 'src/app/servicios/asig-aux.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  asig_Auxiliares: any=[];

  asig_estu:Asig_Estu={
    cod_asignacion_estudiante: 0,
    cod_asignacion_auxiliar_fk: 0,
    cod_usuario_fk: 0,
  }

  asig_cursos: any=[]


    constructor(private seccionService:SeccionService, private horariosService:HorariosService,
    private cursosService:CursosService,private usuariosService:UsuariosService,
    private asigestuService:AsigEstuService,private asigauxService:AsigAuxService,
    private router: Router,private formBuilder: FormBuilder,private toastCtrl: ToastController,) {

     }

     ngOnInit() {

      //Solo verifica que usuario esta ingresando al sistema
      console.log('cod_usuario: '+this.usuariosService.getSesionCod());
      console.log('nombre: '+this.usuariosService.getSesionNombre());
      console.log('tipo: '+this.usuariosService.getSesionTipo());

    /// metodo que obtiene los cursos asignados al usuario logueado
    this.getCursos_asignados();
 
 



     }




     async presentToast(message: string) {
      const toast = await this.toastCtrl.create({
        message,
        duration: 3000
      });
      await toast.present();
    }




desasignar(cod_asignacion_estudiante){
 
 this.asigestuService.deleteAsig_estudiante(cod_asignacion_estudiante.toString()).subscribe(  /// 
   res => { 
  this.presentToast('Desasignación Exitosa');
  this.getCursos_asignados();
 
   location.reload();

   },
   err => console.error(err)
   );}








///obtiene todas las asignaciones que se han hecho de auxiliares
getCursos_asignados(){
 let cod=this.usuariosService.getSesionCod();

 this.asigestuService.getCursos_asignados(cod.toString()).subscribe(  /// 
   res => {
   this.asig_cursos= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
   },
   err =>  { console.log('No Hay Cursos por parte del Usuario logueado');
   
   }
   );}




}
