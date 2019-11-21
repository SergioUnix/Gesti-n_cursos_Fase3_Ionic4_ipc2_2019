import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import { CursosService } from 'src/app/servicios/cursos.service';
import { AsigAuxService} from 'src/app/servicios/asig-aux.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Asig_Aux} from 'src/app/modelos/Asig_Aux';
import { Motivo} from 'src/app/modelos/Motivo';
import { FormGroup, FormBuilder,FormControl, Validators, NgForm } from '@angular/forms';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-auxiliar-desasignar-motivo',
  templateUrl: './auxiliar-desasignar-motivo.page.html',
  styleUrls: ['./auxiliar-desasignar-motivo.page.scss'],
})
export class AuxiliarDesasignarMotivoPage implements OnInit {

  error_messages ={

    'nombre':[
       {type: 'required', message: 'Nombre requerido'},
       {type: 'minlength', message: 'Nombre tamaño minimo de 3 caracteres'},
       {type: 'maxlength', message: ' Nombre no exceda los 45 caracteres'},
    ],
  }

  public cod_asignacion_auxiliar=0;
  public cod_usuario =0; 
  public nombre='';

  motivo_des:Motivo={  
    cod_desasignacion: 0,
    nombre: '',
    carnet: '',
    curso: '',
    motivo: '',
    cod_usuario_fk: 0,
}


asig_aux:Asig_Aux={
  cod_asignacion_auxiliar: 0,
  semestre: '',
  año: 0,
  fecha_limite: '',
  cod_usuario_fk: 0,
  cod_curso_fk: 0,
}

private loginForm: FormGroup;
    constructor(private usuariosService:UsuariosService, private router: Router,
      private formBuilder: FormBuilder,private activatedRoute:ActivatedRoute,
      private asigauxService:AsigAuxService,private cursosService:CursosService
      ,private toastCtrl: ToastController) {
        this.loginForm =this.formBuilder.group({
          nombre: new FormControl('',Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(45),
          
          ])),
  
        })       
  
  
     }

     
  

    ngOnInit() {

      const params =this.activatedRoute.snapshot.params;
      if(params.id){        //este params.id me detecta el numero
        this.cod_asignacion_auxiliar=params.id;
        this.cod_usuario= Number(this.usuariosService.getSesionCod());
        this.nombre = this.usuariosService.getSesionNombre();
      this.getAsignacion();
      
      
      }
      

    }
  





    async presentToast(message: string) {
      const toast = await this.toastCtrl.create({
        message,
        duration: 3000
      });
      await toast.present();
    }
  
  
/// obtengo datos de la asignación enviada
getAsignacion(){
  this.asigauxService.getAsignacion(this.cod_asignacion_auxiliar.toString()).subscribe(  /// 
    res => {
    this.asig_aux= res;  
    console.log(this.asig_aux)  
    },
    err => console.error(err)
    );}









 





 //Guardar motivo de desasignación
 saveMotivo(){ 

  
  delete  this.motivo_des.cod_desasignacion;
  delete this.motivo_des.curso;
  delete this.motivo_des.carnet;
 this.motivo_des.nombre=this.nombre;
 this.motivo_des.cod_usuario_fk=this.cod_usuario;


 this.asigauxService.saveMotivo(this.motivo_des)
 .subscribe(
   res=> { 
   console.log('Motivo Guardado');

  this.deleteAsignacion(this.cod_asignacion_auxiliar.toString(), this.asig_aux.cod_curso_fk.toString());
   },
   err=>{ 

   }
 ) 



    }





   ///Metodo para eliminar
   deleteAsignacion(id: string, cod_curso:string){
    this.asigauxService.deleteAsig_aux(id).subscribe(  /// 
      res => {    
      console.log('Se elimino la asignacion_auxiliar')   //pido el meodo de pintar los juegos para que se vea el cambio a la hora de eliminar uno y desaparezca
      this.cambioDisponible(cod_curso.toString());
      location.reload();
      },
      err => console.error(err) );}



cambioDisponible(codigo_curso:String){
  this.cursosService.updateDisponible(codigo_curso.toString(),"").subscribe(  /// 
    res => {
    console.log("cambio de estado")   ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
    },
    err => console.error(err)
    );}



 
  
  
  }
  