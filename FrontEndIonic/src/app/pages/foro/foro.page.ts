import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Publicacion} from 'src/app/modelos/Publicacion';
import { FormGroup, FormBuilder,FormControl, Validators, NgForm } from '@angular/forms';
import { SeccionService} from 'src/app/servicios/seccion.service';
import { HorariosService } from 'src/app/servicios/horarios.service';
import { CursosService } from 'src/app/servicios/cursos.service';
import { ForosService } from 'src/app/servicios/foros.service';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.page.html',
  styleUrls: ['./foro.page.scss'],
})
export class ForoPage implements OnInit {  
  
  
  error_messages ={

  'nombre':[
     {type: 'required', message: 'Mensaje requerido'},
     {type: 'minlength', message: 'Mensaje tamaño minimo de 3 caracteres'},
     {type: 'maxlength', message: ' Mensaje no exceda los 250 caracteres'},
  ],
 }


 
   private loginForm: FormGroup;
 
   constructor(private seccionService:SeccionService, private horariosService:HorariosService,
    private forosService:ForosService, private loadingCtrl: LoadingController,
   private cursosService:CursosService,private usuariosService:UsuariosService, private activatedRoute:ActivatedRoute, 
   private router: Router,private formBuilder: FormBuilder,private toastCtrl: ToastController,) {
     
       this.loginForm =this.formBuilder.group({
       nombre: new FormControl('',Validators.compose([
         Validators.required,
         Validators.minLength(3),
         Validators.maxLength(250),
       
       ])),

     })  
    }

    foro: any=[];


    public cod_asig_curso=0;
    public cod_foro=0;
    public creador_pu_usuario=0;
  
    public pu_padres: any=[];
  
    public isError=false; 
    public isExito=false; 
    public isErrorGuardar=false;
    
    publicacion: Publicacion ={
      cod_publicacion: 0,
      comentario: '',
      ref_publi: 0,
      creador_pu_usuario: 0,
      cod_foro_fk: 0,
       };
    
  


       async ngOnInit() {
        const params =this.activatedRoute.snapshot.params;
         if(params.id){  
          this.cod_asig_curso=params.id;
    
          const loading = await this.loadingCtrl.create({
            message: 'Cargando Publicaciones..',
          });
          await loading.present();
       
          this.forosService.getForo(params.id)
          .subscribe(async (con) => {
            this.foro=con;
            //obtengo el codigo del usuario logueado
            this.creador_pu_usuario=Number(this.usuariosService.getSesionCod());
            //busco el foro y obtengo su cod_foro
            this.cod_foro=Number(this.foro[0].cod_foro);
            //obtengo la lista de publicaciones padre
            this.getPadres(this.cod_foro); 
          await loading.dismiss();
        },
        async (err) => {console.log('No hay publicaciones creadas aun');
        await loading.dismiss();
      });
    
      }}










 async presentToast(message: string) {
   const toast = await this.toastCtrl.create({
     message,
     duration: 3000
   });
   await toast.present();
 }








 //Guardar Auxiliar
 savePadre(){    

  delete this.publicacion.cod_publicacion;
  delete this.publicacion.ref_publi;

  this.publicacion.cod_foro_fk=this.cod_foro;
  this.publicacion.creador_pu_usuario=this.creador_pu_usuario;
 

  this.forosService.savePadre(this.publicacion)
  .subscribe(
    res=> { 
    // this.router.navigate(['/']);
    console.log('Comentario Padre Guardado');
    this.getPadres(this.cod_foro); 
   
    },
    err=>{ console.error(err);
   
    }
  ) 


    }




   update: Publicacion ={
   me_gusta:0,
  };
   


meGusta(cod_publicacion:string,numero:string){



this.update.me_gusta=Number(numero)+1;


this.forosService.meGusta(cod_publicacion,this.update).subscribe(  /// 
  res => {
     
      this.presentToast('Like a Publicacion')    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
      this.getPadres(this.cod_foro);
    },
  err => console.error(err)
);


}








/// obtengo todas las publicaciones padre
getPadres(cod_foro){
  this.forosService.getPadres(cod_foro).subscribe(  /// 
    res => {
      this.pu_padres = res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
     },
    err => console.error(err)
  );
}






}
