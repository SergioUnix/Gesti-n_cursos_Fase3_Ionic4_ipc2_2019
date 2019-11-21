import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/Usuario';
import { FormGroup, FormBuilder,FormControl, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-logueo',
  templateUrl: './logueo.page.html',
  styleUrls: ['./logueo.page.scss'],
})
export class LogueoPage implements OnInit {

  error_messages ={
    'correo':[
      {type: 'required', message: 'correo requerido'},
      {type: 'minlength', message: 'correo tamaño minimo de 3 caracteres'},
      {type: 'maxlength', message: ' correo no exceda los 30 caracteres'},
   ],
   'password':[
    {type: 'required', message: 'Password requerido'},
    {type: 'minlength', message: 'Password tamaño minimo de 3 caracteres'},
    {type: 'maxlength', message: ' Password no exceda los 15 caracteres'},
  ],
  }

  usuario: Usuario ={
    cod_usuario: 0,
    nombre: '',
    carne: '',
    correo: '',
    pasword: '',
    cod_rol_fk: 0,
  };

  
    private loginForm: FormGroup;
  
    constructor(private usuariosService:UsuariosService, private router: Router,private formBuilder: FormBuilder) {
      this.loginForm =this.formBuilder.group({
        password: new FormControl('',Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        
        ])),
        correo: new FormControl('' ,Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        
        ])),
  
  
      })
  
  
     }
  
    public correo='';
    public pass='';
  
    ngOnInit() {
      console.log(this.usuariosService.getlog());
     this.onCheckUser();
      
    }
  
  
  
  
    setUsuario(){     
      this.usuariosService.loginUsuario(this.correo,this.pass)
      .subscribe(
      res=> {      
        this.usuario=res;
        console.log(this.usuario);
       this.usuariosService.setSesion(this.usuario);
        this.usuariosService.setlog();
        location.reload();
       
        },
      err=>{ console.log('No se encontro Usuario')
       
      }
      )}
  
  
  
  
      onCheckUser(): void {
        if (this.usuariosService.getSesionNombre()=='') {
          
  
        } else {
          this.router.navigate(['/tabs/tab1']); 
        
        }}
    
  
  
  }
  