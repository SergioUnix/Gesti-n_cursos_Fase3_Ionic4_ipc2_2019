import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Usuario} from 'src/app/modelos/Usuario';
import { FormGroup, FormBuilder,FormControl, Validators, NgForm } from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  usuario: Usuario ={
    cod_usuario: 0,
    nombre: '',
    carne: '',
    correo: '',
    pasword: '',
    cod_rol_fk: 3,
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
  
    constructor(private usuariosService:UsuariosService, private router: Router,private formBuilder: FormBuilder) {
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

     
    public nombre='';
    public carne=''; 
    public correo='';
    public pass='';
  
    ngOnInit() {
      console.log(this.usuariosService.getlog());
     this.onCheckUser();
      
    }
  
  
  
  
    saveUsuario(){    
     delete this.usuario.cod_usuario;
       
     this.usuariosService.saveUsuario(this.usuario)
     .subscribe(
     res=> {
       this.setUsuario(this.usuario.correo,this.usuario.pasword);
         
       },
     err=>{ console.log('No se registro')
      
     })}


     setUsuario(correo:string,pass:string){     
      this.usuariosService.loginUsuario(correo, pass)
      .subscribe(
      res=> {      
        this.usuario=res;
       this.usuariosService.setSesion(this.usuario);
        this.usuariosService.setlog();
        location.reload();
       
        },
      err=>{ console.log('No se encontro Usuario')
       
      }
      )}     



  eventoTipo(event){
    const texto = event.target.value;
    this.usuario.cod_rol_fk=texto;
   console.log(texto);
     }



  
  
  
     onCheckUser(): void {
      if (this.usuariosService.getSesionNombre()=='') {
        

      } else {
        this.router.navigate(['/tabs/tab1']); 
      
      }}
    
  
  
  }
  