import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Evaluacion} from 'src/app/modelos/Evaluacion';
import { FormGroup, FormBuilder,FormControl, Validators, NgForm } from '@angular/forms';
import { SeccionService} from 'src/app/servicios/seccion.service';
import { HorariosService } from 'src/app/servicios/horarios.service';
import { CursosService } from 'src/app/servicios/cursos.service';
import { ActividadesService } from 'src/app/servicios/actividades.service';
import { EvaluacionesService } from 'src/app/servicios/evaluaciones.service';
import { formatDate } from '@angular/common';
 
@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.page.html',
  styleUrls: ['./evaluacion.page.scss'],
})
export class EvaluacionPage implements OnInit {
  error_messages ={

   'nombre':[
      {type: 'required', message: 'Nombre requerido'},
      {type: 'minlength', message: 'Nombre tamaño minimo de 3 caracteres'},
      {type: 'maxlength', message: ' Nombre no exceda los 45 caracteres'},
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
 

      })  
     }

     asignaciones: any=[];
     eva_tipo1: any=[];
     eva_tipo2: any=[];
     eva_orde: any=[];
     eva_mat: any=[];
    
     

       evaluacion: Evaluacion ={
         cod_evaluacion: 0,
         nombre: '',
         estado: '',
         tipo_evaluacion: '',
         cod_asignacion_auxiliar_fk: 0,
         usuario_fk_eva: 0,    
       };

  ngOnInit() {

  //Obtengo todas las asignaciones de auxiliares que se han realizado
  this.getAsig_Cursos();
  ///Obtengo las evaluaciones creadas
  this.getEva_tipo1();
  this.getEva_tipo2();
  this.getEva_mat();
  this.getEva_orde();
 
  }



  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    await toast.present();
  }



      

 eventoTipo(event){
  const texto = event.target.value;
 this.evaluacion.tipo_evaluacion=texto;
console.log(texto);
   }
   eventoAsignacion(event){
   const texto = event.target.value;
   this.evaluacion.cod_asignacion_auxiliar_fk=texto;
   console.log(texto);
     }
   
   //Guardar evaluacion
    saveEvaluacion(){    
    delete this.evaluacion.cod_evaluacion;
    delete this.evaluacion.estado;
    this.evaluacion.usuario_fk_eva = Number(this.usuariosService.getSesionCod());
  
    this.evaluacionesService.saveEvaluacion(this.evaluacion)
    .subscribe(
      res=> { 
      this.presentToast('Evaluación Creada');
      this.getEva_tipo1();
      this.getEva_tipo2();
      this.getEva_orde();
      this.getEva_mat();
   
      },
      err=>{ console.error(err);
  
      }
    ) 
  
  
      }
  
  
  
  
  
  
  
  
    ///Cambia el estado a habilitada
    deleteEvaluacion(cod_evaluacion){
      
    this.evaluacionesService.deleteEvaluacion(cod_evaluacion.toString()).subscribe(  /// 
    res => { //console.log(res);
    this.getEva_tipo1();
    this.getEva_tipo2();
    location.reload();
    },
    err => console.error(err)
    );}
  
  
  
    ///Cambia el estado a habilitada
    estado(cod_evaluacion){
      
      this.evaluacionesService.updateEstado(cod_evaluacion.toString(),'solo_habilita').subscribe(  /// 
       res => { //console.log(res);
        this.getEva_tipo1();
        this.getEva_tipo2();
        this.presentToast('Evaluación Habilitada');
        },
        err => console.error(err)
        );}
  
  
    ///Cambia el orden de preguntas
    orden(cod_evaluacion){
      
      this.evaluacionesService.updateOrden(cod_evaluacion.toString(),'solo_cambia_orden').subscribe(  /// 
       res => { //console.log(res);
        this.getEva_tipo1();
        this.getEva_tipo2();
        },
        err => console.error(err)
        );}
  
  
  
  
  
  
  
    ///obtiene las evaluaciones tipo Selección Múltiple creadas por el auxiliar
  getEva_tipo2(){
    let cod=this.usuariosService.getSesionCod();
    this.evaluacionesService.getEva_tipo2(cod.toString()).subscribe(  /// 
     res => { //console.log(res);
      this.eva_tipo2= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
      },
      err => console.error(err)
      );}
  
    ///obtiene las evaluaciones tipo Verdadero/Falso creadas por el auxiliar
  getEva_tipo1(){
    let cod=this.usuariosService.getSesionCod();
    this.evaluacionesService.getEva_tipo1(cod.toString()).subscribe(  /// 
     res => { //console.log(res);
      this.eva_tipo1= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
      },
      err => console.error(err)
      );}
  

    ///obtiene las evaluaciones tipo Ordering creadas por el auxiliar
    getEva_orde(){
      let cod=this.usuariosService.getSesionCod();
      this.evaluacionesService.getEva_tipo_orde(cod.toString()).subscribe(  /// 
       res => { //console.log(res);
        this.eva_orde= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
        },
        err => console.error(err)
        );}
    
      ///obtiene las evaluaciones tipo matching creadas por el auxiliar
    getEva_mat(){
      let cod=this.usuariosService.getSesionCod();
      this.evaluacionesService.getEva_tipo_mat(cod.toString()).subscribe(  /// 
       res => { //console.log(res);
        this.eva_mat= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
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
