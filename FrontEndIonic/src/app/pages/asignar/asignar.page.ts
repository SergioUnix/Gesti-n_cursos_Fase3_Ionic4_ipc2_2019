import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
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
  selector: 'app-asignar',
  templateUrl: './asignar.page.html',
  styleUrls: ['./asignar.page.scss'],
})
export class AsignarPage implements OnInit {
  asig_Auxiliares: any=[];

  public isError=false; 
  public isExito=false; 
  public isErrorGuardar=false;


  asig_estu:Asig_Estu={
    cod_asignacion_estudiante: 0,
    cod_asignacion_auxiliar_fk: 0,
    cod_usuario_fk: 0,
  }


  
    private loginForm: FormGroup;
  
    constructor(private seccionService:SeccionService, private horariosService:HorariosService,
    private cursosService:CursosService,private usuariosService:UsuariosService,
    private asigestuService:AsigEstuService,private asigauxService:AsigAuxService,
    private router: Router,private formBuilder: FormBuilder,private toastCtrl: ToastController,) {

     }




  ngOnInit() {

  //Obtengo todas las asignaciones de auxiliares que se han realizado
  this.getAsig_Aux();

console.log(this.asig_Auxiliares)
  }



  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    await toast.present();
  }






  

///guardar Asignación Estudiante

saveAsig(cod_asig){ 
  const cod_usuario= this.usuariosService.getSesionCod();

  this.asig_estu.cod_asignacion_auxiliar_fk=cod_asig;
  this.asig_estu.cod_usuario_fk=Number(cod_usuario);

  delete this.asig_estu.cod_asignacion_estudiante;

  this.asigestuService.saveAsig_estudiante(this.asig_estu)
  .subscribe(
    res=> { 
      this.presentToast('Estudiante Asignado exitosamente');
    },
    err=>{ console.error(err);
    this.presentToast('No se Guardo la asignación')

    }
  ) 


    }






//verifica si ya existe la asignacion
Asignar_curso(cod_asig){
  const cod_usuario= this.usuariosService.getSesionCod();
  
  console.log(cod_usuario);

  this.asigestuService.existAsig(cod_asig.toString(),cod_usuario.toString()).subscribe(  /// 
    res => {
    //console.log(res);
    this.presentToast('Ya Existe Una asignación');
    
    },
    err => {

    this.presentToast('Se Creó la Asignación correctamente');
    this.saveAsig(cod_asig);




    }
    );


}












  ///obtiene todas las asignaciones que se han hecho de auxiliares
getAsig_Aux(){
  this.asigauxService.getAsig_auxiliares().subscribe(  /// 
    res => {
    this.asig_Auxiliares= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
    },
    err => console.error(err)
    );}



}
