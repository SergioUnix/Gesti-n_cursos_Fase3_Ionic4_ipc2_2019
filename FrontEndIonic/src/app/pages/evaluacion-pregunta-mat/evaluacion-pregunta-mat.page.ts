import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Pregunta} from 'src/app/modelos/Pregunta';
import { FormGroup, FormBuilder,FormControl, Validators, NgForm } from '@angular/forms';
import { SeccionService} from 'src/app/servicios/seccion.service';
import { HorariosService } from 'src/app/servicios/horarios.service';
import { CursosService } from 'src/app/servicios/cursos.service';
import { ActividadesService } from 'src/app/servicios/actividades.service';
import { EvaluacionesService } from 'src/app/servicios/evaluaciones.service';
import { formatDate } from '@angular/common';
 
@Component({
  selector: 'app-evaluacion-pregunta-mat',
  templateUrl: './evaluacion-pregunta-mat.page.html',
  styleUrls: ['./evaluacion-pregunta-mat.page.scss'],
})
export class EvaluacionPreguntaMatPage implements OnInit {
  error_messages ={

   'nombre':[
      {type: 'required', message: 'Nombre requerido'},
      {type: 'minlength', message: 'Nombre tamaño minimo de 3 caracteres'},
      {type: 'maxlength', message: ' Nombre no exceda los 250 caracteres'},
   ],
   'respuesta':[
    {type: 'required', message: 'Respuesta requerido'},
    {type: 'minlength', message: 'Respuesta tamaño minimo de 3 caracteres'},
    {type: 'maxlength', message: ' Respuesta no exceda los 80 caracteres'},
 ],
  }


  
    private loginForm: FormGroup;
  
    constructor(private seccionService:SeccionService, private horariosService:HorariosService,
    private cursosService:CursosService,private usuariosService:UsuariosService,private activatedRoute:ActivatedRoute,
    private actividadesService:ActividadesService,private evaluacionesService:EvaluacionesService,
    private router: Router,private formBuilder: FormBuilder,private toastCtrl: ToastController,) {
      
        this.loginForm =this.formBuilder.group({
        nombre: new FormControl('',Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        
        ])),
        respuesta: new FormControl('',Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(80),
        
        ])),
 

      })  
     }

     public cod_evaluacion=0;

     multiple: any=[];

     pregunta: Pregunta ={
       cod_pregunta: 0,
       pregunta: '',
       correcta: '',
       respuesta: '',
       opcion1: '',
       opcion2: '',
       opcion3: '',
       cod_evaluacion_fk:0,
        };
     
     


  ngOnInit() {

 
  
    const params =this.activatedRoute.snapshot.params;
    //console.log(params);
    if(params.id){        //este params.id me detecta el numero
    this.cod_evaluacion=params.id;
    
     this.getPreguntas();    

    }

  }



  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    await toast.present();
  }



      

 


 //Guardar evaluacion
 savePregunta(){    
  delete this.pregunta.cod_pregunta;
  delete this.pregunta.respuesta;
  delete this.pregunta.opcion1;
  delete this.pregunta.opcion2;
  delete this.pregunta.opcion3;
  
  this.pregunta.cod_evaluacion_fk=this.cod_evaluacion;
  

  this.evaluacionesService.savePregunta(this.pregunta)
  .subscribe(
    res=> { 
    // this.router.navigate(['/']);
    
    this.presentToast('Pregunta Creada');
    this.getPreguntas();   
   
    },
    err=>{ console.error(err);
    
    })}


    getPreguntas(){
    this.evaluacionesService.getPreguntas(this.cod_evaluacion.toString()).subscribe(  /// 
    res => { //console.log(res);
    this.multiple= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
    },
    err => console.error(err)
    );}


















}
