import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Evaluacion} from 'src/app/modelos/Evaluacion';
import { FormGroup, FormBuilder,FormControl, Validators, NgForm } from '@angular/forms';
import { EvaluacionesService} from 'src/app/servicios/evaluaciones.service';


@Component({
  selector: 'app-evaluaciones-vista',
  templateUrl: './evaluaciones-vista.page.html',
  styleUrls: ['./evaluaciones-vista.page.scss'],
})
export class EvaluacionesVistaPage implements OnInit {

  constructor(
    private evaluacionesService:EvaluacionesService, private loadingCtrl: LoadingController,private usuariosService:UsuariosService, private activatedRoute:ActivatedRoute, 
   private router: Router,private formBuilder: FormBuilder,private toastCtrl: ToastController,) {
   
  
  }

  asignaciones: any=[];
eva_tipo1: any=[];
eva_tipo2: any=[];


public cod_asignacion_auxiliar=0;



  evaluacion: Evaluacion ={
    cod_evaluacion: 0,
    nombre: '',
    estado: '',
    tipo_evaluacion: '',
    cod_asignacion_auxiliar_fk: 0,
    usuario_fk_eva: 0,    
  };
  

  ngOnInit() {

    

const params =this.activatedRoute.snapshot.params;
//console.log(params);
if(params.id){        //este params.id me detecta el numero
  this.cod_asignacion_auxiliar=params.id;

  ///Obtengo las evaluaciones creadas
this.getEva_tipo1_curso();
this.getEva_tipo2_curso();

}

  }









  ///obtiene las evaluaciones tipo Selección Múltiple creadas por el auxiliar
  getEva_tipo2_curso(){
    // let cod=this.usuariosService.getSesionCod();
     this.evaluacionesService.getEva_tipo2_curso(this.cod_asignacion_auxiliar.toString()).subscribe(  /// 
      res => { //console.log(res);
       this.eva_tipo2= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
       },
       err => console.error(err)
       );}
   
     ///obtiene las evaluaciones tipo Verdadero/Falso creadas por el auxiliar
   getEva_tipo1_curso(){
   
     this.evaluacionesService.getEva_tipo1_curso(this.cod_asignacion_auxiliar.toString()).subscribe(  /// 
      res => { //console.log(res);
       this.eva_tipo1= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
       },
       err => console.error(err)
       );}
   
   


}
