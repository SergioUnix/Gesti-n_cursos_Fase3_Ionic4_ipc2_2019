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
  selector: 'app-publica-list',
  templateUrl: './publica-list.page.html',
  styleUrls: ['./publica-list.page.scss'],
})
export class PublicaListPage implements OnInit {


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

    public ref_publi=0;

    public creador_pu_usuario=0;
    public pu_hijos: any=[];
  
    
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
      this.ref_publi=params.id;
      //obtengo el codigo del usuario logueado
      this.creador_pu_usuario=Number(this.usuariosService.getSesionCod());
  
        const loading = await this.loadingCtrl.create({
          message: 'Cargando Publicaciones..',
        });
        await loading.present();
        //obtengo la lista de publicaciones padre
        this.getHijos(params.id); 
        await loading.dismiss();
    }
  }




 //Guardar Auxiliar
 saveHijo(){    

  delete this.publicacion.cod_publicacion;
  delete this.publicacion.cod_foro_fk;

  this.publicacion.creador_pu_usuario=this.creador_pu_usuario;
  this.publicacion.ref_publi= this.ref_publi;

  this.forosService.savePadre(this.publicacion)
  .subscribe(
    res=> { 
    // this.router.navigate(['/']);
    console.log('Comentario Padre Guardado');
    this.getHijos(this.ref_publi); 
  ;
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
         this.getHijos(this.ref_publi);
       },
     err => console.error(err)
   );
   
   
   }
   



   async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    await toast.present();
  }
 






/// obtengo todas las publicaciones padre
getHijos(ref_publi){
this.forosService.getHijos(ref_publi).subscribe(  /// 
  res => {
    this.pu_hijos = res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
   },
  err => {console.log('no hay respuestas a esta publicación');

}
);
}
















}
