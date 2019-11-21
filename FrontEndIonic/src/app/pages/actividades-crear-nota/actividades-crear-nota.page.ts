import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Nota} from 'src/app/modelos/Nota';
import { FormGroup, FormBuilder,FormControl, Validators, NgForm } from '@angular/forms';
import { EvaluacionesService} from 'src/app/servicios/evaluaciones.service';
import { ActividadesService} from 'src/app/servicios/actividades.service';

@Component({
  selector: 'app-actividades-crear-nota',
  templateUrl: './actividades-crear-nota.page.html',
  styleUrls: ['./actividades-crear-nota.page.scss'],
})
export class ActividadesCrearNotaPage implements OnInit {


  error_messages ={

    'nombre':[
       {type: 'required', message: 'Nombre requerido'},
       {type: 'minlength', message: 'Nombre tamaño minimo de 1 caracteres'},
       {type: 'maxlength', message: ' Nombre no exceda los 45 caracteres'},
    ],
   }
 
 
   
     private loginForm: FormGroup;

  constructor(private actividadesService:ActividadesService,
    private evaluacionesService:EvaluacionesService, private loadingCtrl: LoadingController,private usuariosService:UsuariosService, private activatedRoute:ActivatedRoute, 
   private router: Router,private formBuilder: FormBuilder,private toastCtrl: ToastController,) {
         
    this.loginForm =this.formBuilder.group({
      nombre: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(45),
      
      ])),

    })  
  
  }


  asignaciones: any=[];
  actividades_hijas: any=[];

  public isError=false; 
  public isExito=false; 
  public isErrorGuardar=false;

public cod_actividad_padre=0;

nota:Nota={    
  cod_nota: 0,
  nota_obtenida: 0,
  Usuario_cod_usuario: 0,
  Actividad_cod_actividad: 0,
}


  ngOnInit() {


    const params =this.activatedRoute.snapshot.params;
    if(params.id){        //este params.id me detecta el numero
      this.cod_actividad_padre=params.id;
    
    //Obtengo las actividades creaadar por el usuario auxiliar logueado
    this.getActividades_hijas();
    
    }
    
    

  }


 

 



existNota(usuario:string,actividad:string,nota:string){

  this.actividadesService.existNota(usuario.toString(),actividad.toString()).subscribe(  /// 
    res => {
    //console.log(res);
    console.log('Ya existe la nota de la actividad');
  this.presentToast('Ya existe la nota de la actividad');
    },
    err => {
    
    console.log('No existe por lo tanto se Creara');
    this.saveNota(usuario,actividad,nota);
   this.presentToast('No existe por lo tanto se creará');



    }
    );

}




 //Guardar Curso
 saveNota(usuario:string,actividad:string,nota:string){    
  delete this.nota.cod_nota;
  this.nota.Usuario_cod_usuario=Number(usuario);
  this.nota.Actividad_cod_actividad=Number(actividad);
  this.nota.nota_obtenida=Number(nota);

this.actividadesService.saveNota(this.nota)
.subscribe(
  res=> { 
  // this.router.navigate(['/']);
  console.log('nota registrada');
 
  this.presentToast('Nota Registrada');
  },
  err=>{ console.error(err);
  
  }
) 


    }







/// obtiene todas las actividades hijas dado el codigo padrea de una actividad
  getActividades_hijas(){
   
    this.actividadesService.getActividades_hijas(this.cod_actividad_padre.toString()).subscribe( 
     res => { 
      this.actividades_hijas= res;  
      },
      err => console.error(err)
      );}
        


    async presentToast(message: string) {
      const toast = await this.toastCtrl.create({
        message,
        duration: 3000
      });
      await toast.present();
    }
  









}
