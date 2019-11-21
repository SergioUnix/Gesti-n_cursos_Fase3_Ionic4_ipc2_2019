import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Actividad} from 'src/app/modelos/Actividad';
import { FormGroup, FormBuilder,FormControl, Validators, NgForm } from '@angular/forms';
import { SeccionService} from 'src/app/servicios/seccion.service';
import { HorariosService } from 'src/app/servicios/horarios.service';
import { CursosService } from 'src/app/servicios/cursos.service';
import { ActividadesService } from 'src/app/servicios/actividades.service';
import { EvaluacionesService } from 'src/app/servicios/evaluaciones.service';
import { formatDate } from '@angular/common';
 
@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
})
export class ActividadPage implements OnInit {
  error_messages ={

   'nombre':[
      {type: 'required', message: 'Nombre requerido'},
      {type: 'minlength', message: 'Nombre tamaño minimo de 3 caracteres'},
      {type: 'maxlength', message: ' Nombre no exceda los 45 caracteres'},
   ],
   'descripcion':[
    {type: 'required', message: 'Ponderación requerido'},
    {type: 'minlength', message: 'Ponderación tamaño minimo de 1 caracteres'},
    {type: 'maxlength', message: ' Ponderación no exceda los 10 caracteres'},
  ],
  }


  
    private loginForm: FormGroup;
  
    constructor(private seccionService:SeccionService, private horariosService:HorariosService,
    private cursosService:CursosService,private usuariosService:UsuariosService,
    private actividadesService:ActividadesService,private evaluacionesService:EvaluacionesService,
    private router: Router,private formBuilder: FormBuilder,private toastCtrl: ToastController,) {
      
        this.loginForm =this.formBuilder.group({
        nombre: new FormControl('',Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(45),
        
        ])),
        descripcion: new FormControl('',Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10),
        
        ])),

      })  
     }

     asignaciones: any=[];
     actividades_user: any=[];
     
     
actividad:Actividad={    
  cod_actividad:0,
  nombre: '',
  hora: '',
  fecha_limite: '',
  ponderacion: '',
  archivo: '',
  texto: '',
  ruta_archivo: '',
  cod_asignacion_auxiliar_fk: 0,
  cod_usuario_fk: 0,
}


  ngOnInit() {

 /// Obtengo los curso que el auxiliar esta asignado y los muestro en un select item
 this.getAsig_Cursos();
 //Obtengo las actividades creaadar por el usuario auxiliar logueado
 this.getActividades_user();
 
  }



  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    await toast.present();
  }



  eventoHora(event){
    const texto = event.target.value;
    const fecha=formatDate(texto,'HH:mm:ss', 'en-Us', '-06');
   this.actividad.hora=fecha;
   console.log(fecha);
     }
  eventoFecha(event){
      const texto = event.target.value;
      const jstoday = formatDate(texto, 'yyy-MM-dd', 'en-Us', '-06');
     this.actividad.fecha_limite=jstoday;
     console.log(jstoday);
       }
      

 eventoDisponibilidad(event){
  const texto = event.target.value;
this.actividad.archivo=texto;
console.log(texto);
   }
 eventoAsignacion(event){
  const texto = event.target.value;
this.actividad.cod_asignacion_auxiliar_fk=texto;
console.log(texto);
   }
 
 //Guardar Actividad
 saveActividad(){    
  delete this.actividad.cod_actividad;
  delete this.actividad.texto;
  delete this.actividad.ruta_archivo


  this.actividad.cod_usuario_fk = Number(this.usuariosService.getSesionCod());

  this.actividadesService.saveActividad(this.actividad)
  .subscribe(
    res=> { 

    console.log('Actividad creada');
   this.getActividades_user();
   

    },
    err=>{ console.error(err);
  
    }
  ) 


    } 










 ///Cambia el estado a habilitada
  deleteActividad(cod_actividad){
    
  this.actividadesService.deleteActividad(cod_actividad.toString()).subscribe(  /// 
  res => { 
  this.getActividades_user();
   location.reload();
  },
  err => console.error(err)
  );}





  ///obtiene todas las asignaciones que se han hecho de auxiliares
  getActividades_user(){
    let cod=this.usuariosService.getSesionCod();
    this.actividadesService.getList_user(cod.toString()).subscribe(  /// 
     res => { //console.log(res);
      this.actividades_user= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
      },
      err => console.error(err)
      );}
        



  ///obtiene todas las asignaciones que se han hecho de auxiliares
getAsig_Cursos(){
  let cod=this.usuariosService.getSesionCod();
  this.evaluacionesService.getAsig_cursos(cod.toString()).subscribe(  /// 
   res => { //console.log(res);
    this.asignaciones= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
    },
    err => console.error(err)
    );}
      




}
