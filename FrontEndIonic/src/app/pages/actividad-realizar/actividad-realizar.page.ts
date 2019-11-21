import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Actividad} from 'src/app/modelos/Actividad';
import { FormGroup, FormBuilder,FormControl, Validators, NgForm } from '@angular/forms';
import { EvaluacionesService} from 'src/app/servicios/evaluaciones.service';
import { ActividadesService} from 'src/app/servicios/actividades.service';

@Component({
  selector: 'app-actividad-realizar',
  templateUrl: './actividad-realizar.page.html',
  styleUrls: ['./actividad-realizar.page.scss'],
})
export class ActividadRealizarPage implements OnInit {


  error_messages ={

    'nombre':[
       {type: 'required', message: 'Nombre requerido'},
       {type: 'minlength', message: 'Nombre tamaño minimo de 3 caracteres'},
       {type: 'maxlength', message: ' Nombre no exceda los 45 caracteres'},
    ],
    'descripcion':[
     {type: 'required', message: 'Texto requerido'},
     {type: 'minlength', message: 'Texto tamaño minimo de 3 caracteres'},
     {type: 'maxlength', message: ' Texto no exceda los 350 caracteres'},
   ],
   'ruta':[
    {type: 'required', message: 'Ruta requerido'},
    {type: 'minlength', message: 'Ruta tamaño minimo de 3 caracteres'},
    {type: 'maxlength', message: ' Ruta no exceda los 350 caracteres'},
  ],
   }
 
 
   
     private loginForm: FormGroup;

  constructor(private actividadesService:ActividadesService,
    private evaluacionesService:EvaluacionesService, private loadingCtrl: LoadingController,private usuariosService:UsuariosService, private activatedRoute:ActivatedRoute, 
   private router: Router,private formBuilder: FormBuilder,private toastCtrl: ToastController,) {
         
    this.loginForm =this.formBuilder.group({
      nombre: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(45),
      
      ])),
      descripcion: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(350),
      
      ])),
      ruta: new FormControl('/ruta',Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(350),
      
      ])),

    })  
  
  }


  public permiso = false;


  public cod_asig_curso=0;
public cod_actividad=0;

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
  cod_actividad_padre:0,
}




  ngOnInit() {

const params =this.activatedRoute.snapshot.params;


////Convierte un string a boolean
function convertToBoolean(input: string): boolean | undefined {
  try {
      return JSON.parse(input);
  }
  catch (e) {
      return undefined;
  }
}




if(params.id){        //este params.id me detecta el numero
  this.cod_actividad=params.id;
  this.actividadesService.getOne_actividad(params.id)
    .subscribe(
       res =>{
         //console.log(res)
        this.actividad=res; ///cuando accedo ala ruta game/edit/id ,, aca hago el objeto con el id recibido y eso me muestra en visualizacion
        this.permiso=convertToBoolean(this.actividad.archivo);
      


       },
       err => console.log(err)       )
      
       
      
      }

  }



 




 //Guardar Actividad
 saveActividad(){    
  delete this.actividad.cod_actividad;
  delete this.actividad.hora;
  delete this.actividad.fecha_limite;
  delete this.actividad.ponderacion;
  delete this.actividad.cod_asignacion_auxiliar_fk;
  delete this.actividad.archivo;
  this.actividad.cod_actividad_padre=this.cod_actividad;

  this.actividad.cod_usuario_fk = Number(this.usuariosService.getSesionCod());

  this.actividadesService.saveActividad(this.actividad)
  .subscribe(
    res=> { 
    // this.router.navigate(['/']);
    console.log('Actividad creada');
 this.presentToast('Actividad Creada');
   

    },
    err=>{ console.error(err);

    }
  ) 


    } 



    async presentToast(message: string) {
      const toast = await this.toastCtrl.create({
        message,
        duration: 3000
      });
      await toast.present();
    }
  









}
