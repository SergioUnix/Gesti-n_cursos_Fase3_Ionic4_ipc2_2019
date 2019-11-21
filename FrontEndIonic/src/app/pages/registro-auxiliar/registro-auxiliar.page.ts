import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Usuario} from 'src/app/modelos/Usuario';
import { FormGroup, FormBuilder,FormControl, Validators, NgForm } from '@angular/forms';
@Component({
  selector: 'app-registro-auxiliar',
  templateUrl: './registro-auxiliar.page.html',
  styleUrls: ['./registro-auxiliar.page.scss'],
})
export class RegistroAuxiliarPage implements OnInit {
  usuarios: any=[];
  usuario: Usuario ={
    cod_usuario: 0,
    nombre: '',
    carne: '',
    correo: '',
    pasword: '',
    cod_rol_fk:2,
  };


  error_messages ={

   'nombre':[
      {type: 'required', message: 'Nombre requerido'},
      {type: 'minlength', message: 'Nombre tamaño minimo de 3 caracteres'},
      {type: 'maxlength', message: ' Nombre no exceda los 15 caracteres'},
   ],
   'carne':[
    {type: 'required', message: 'Carnet requerido'},
    {type: 'minlength', message: 'Carnet tamaño minimo de 3 caracteres'},
    {type: 'maxlength', message: ' Carnet no exceda los 25 caracteres'},
  ],
    'correo':[
      {type: 'required', message: 'correo requerido'},
      {type: 'minlength', message: 'correo tamaño minimo de 3 caracteres'},
      {type: 'maxlength', message: ' correo no exceda los 25 caracteres'},
   ],
   'password':[
    {type: 'required', message: 'Password requerido'},
    {type: 'minlength', message: 'Password tamaño minimo de 3 caracteres'},
    {type: 'maxlength', message: ' Password no exceda los 15 caracteres'},
  ],
  }


  
    private loginForm: FormGroup;
  
    constructor(private usuariosService:UsuariosService, private router: Router,
      private formBuilder: FormBuilder,private toastCtrl: ToastController) {
      this.loginForm =this.formBuilder.group({
        nombre: new FormControl('',Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        
        ])),
        carne: new FormControl('',Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        
        ])),

        password: new FormControl('',Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        
        ])),
        correo: new FormControl('' ,Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        
        ])),
  
  
      })
  
  
     }

     
    public nombre='';
    public carne=''; 
    public correo='';
    public pass='';
  
    filterPost ='';

    ngOnInit() {
 
    ///Obtengo los usuarios Auxiliares
    this.getUsuarios_Aux();

      
    }
  



    async presentToast(message: string) {
      const toast = await this.toastCtrl.create({
        message,
        duration: 3000
      });
      await toast.present();
    }
   
   
  
  
  
    saveUsuario(){    
     delete this.usuario.cod_usuario;
       
     this.usuariosService.saveUsuario(this.usuario)
     .subscribe(
     res=> {
       this.presentToast('Usuario Guardado');
       this.getUsuarios_Aux();

       },
     err=>{ console.log('No se registro')
      
     })}


 


  eventoTipo(event){
    const texto = event.target.value;
    this.usuario.cod_rol_fk=texto;
   console.log(texto);
     }










 ///Metodo para eliminar un Usuario atravez del id
 deleteUsuario(id: string){
  this.usuariosService.deleteUsuario(id).subscribe(  /// 
  res => {    
    this.getUsuarios_Aux();     //pido el meodo de pintar los auxiliares para que se vea el cambio a la hora de eliminar uno y desaparezca
    location.reload(); 
  },
  err => console.error(err)
    );
   }







//obtengo los horarios guardados
getUsuarios_Aux(){
  this.usuariosService.getUsuarios_auxiliares().subscribe(  /// 
    res => {
    this.usuarios= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
    },
    err => console.error(err)
    );}
    








  
  
 
  
  
  }
  