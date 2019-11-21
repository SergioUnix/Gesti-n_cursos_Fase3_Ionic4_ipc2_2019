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
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  asig_Auxiliares: any=[];

  public isError=false; 
  public isExito=false; 
  public isErrorGuardar=false;


  asig_estu:Asig_Estu={
    cod_asignacion_estudiante: 0,
    cod_asignacion_auxiliar_fk: 0,
    cod_usuario_fk: 0,
  }

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

   //Obtengo todas las asignaciones de auxiliares que se han realizado
   this.getAsig_Aux();


     }




     async presentToast(message: string) {
      const toast = await this.toastCtrl.create({
        message,
        duration: 3000
      });
      await toast.present();
    }





///guardar Asignación Estudiante

 //Guardar Auxiliar
 saveAsig(cod_asig){ 
  const cod_usuario= this.usuariosService.getSesionCod();

  this.asig_estu.cod_asignacion_auxiliar_fk=cod_asig;
  this.asig_estu.cod_usuario_fk=Number(cod_usuario);

  delete this.asig_estu.cod_asignacion_estudiante;

  this.asigestuService.saveAsig_estudiante(this.asig_estu)
  .subscribe(
    res=> { 
    // this.router.navigate(['/']);
    console.log('estudiante registrado');
    },
    err=>{ console.error(err);
   
    }
  ) 


    }















  ///obtiene todas las asignaciones que se han hecho de auxiliares
getAsig_Aux(){
  let cod=this.usuariosService.getSesionCod();
  this.asigauxService.getAsig_aux(cod.toString()).subscribe(  /// 
    res => {
    this.asig_Auxiliares= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
    },
    err => console.error(err)
    );}



}
