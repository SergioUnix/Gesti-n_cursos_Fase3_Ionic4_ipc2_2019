import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Usuario} from 'src/app/modelos/Usuario';
import { FormGroup, FormBuilder,FormControl, Validators, NgForm } from '@angular/forms';
@Component({
  selector: 'app-lista-usuarios-edit',
  templateUrl: './lista-usuarios-edit.page.html',
  styleUrls: ['./lista-usuarios-edit.page.scss'],
})
export class ListaUsuariosEditPage implements OnInit {


  error_messages ={

    'nombre':[
       {type: 'required', message: 'Nombre requerido'},
       {type: 'minlength', message: 'Nombre tamaño minimo de 3 caracteres'},
       {type: 'maxlength', message: ' Nombre no exceda los 15 caracteres'},
    ],
    'carne':[
     {type: 'required', message: 'Carnet requerido'},
     {type: 'minlength', message: 'Carnet tamaño minimo de 3 caracteres'},
     {type: 'maxlength', message: ' Carnet no exceda los 15 caracteres'},
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
    private formBuilder: FormBuilder,private toastCtrl: ToastController,private activatedRoute:ActivatedRoute) {

      this.loginForm =this.formBuilder.group({
        nombre: new FormControl('',Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        
        ])),
        carne: new FormControl('',Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        
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
   usuario: Usuario ={
    cod_usuario: 0,
    nombre: '',
    carne: '',
    correo: '',
    pasword: '',
    cod_rol_fk: 0,
  };

public valor=2;

  ngOnInit() {


    const params =this.activatedRoute.snapshot.params;
    //console.log(params);
    if(params.id){        //este params.id me detecta el numero
    this.usuariosService.getUsuario(params.id)
    .subscribe(
    res =>{
    console.log(res)


    this.usuario=res; ///cuando accedo ala ruta auxiliar/edit/id ,, aca hago el objeto con el id recibido y eso me muestra en visualizacion
      },
    err => console.error(err)        )}
          
          


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
    this.usuario.cod_rol_fk=texto;
   console.log(texto);
     }



 
        
        
  //Actualizo el Usuario
  updateUsuario(){
    const numero =this.usuario.cod_usuario;
    delete this.usuario.cod_usuario;
  
    console.log(this.usuario);
    this.usuariosService.updateUsuario(numero.toString(), this.usuario)
    .subscribe(
    res =>{
    console.log(res);
    this.router.navigate(['/lista-usuarios']);
    },
    err => console.error(err)
          
    )
    }
          



}
