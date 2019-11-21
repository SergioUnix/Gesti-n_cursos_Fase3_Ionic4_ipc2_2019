import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import {SeccionService} from '../../servicios/seccion.service'; ///importo el servicio
import { Router, ActivatedRoute } from '@angular/router';
import { Seccion} from 'src/app/modelos/Seccion';
import { FormGroup, FormBuilder,FormControl, Validators, NgForm } from '@angular/forms';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-seccion-form',
  templateUrl: './seccion-form.page.html',
  styleUrls: ['./seccion-form.page.scss'],
})
export class SeccionFormPage implements OnInit {
  secciones: any=[];

  public isError=false; 
  public isExito=false; 

seccion:Seccion={
  cod_seccion: 0,
  nombre: '',
}

error_messages ={

  'nombre':[
     {type: 'required', message: 'Nombre requerido'},
     {type: 'minlength', message: 'Nombre tamaño minimo de 1 caracteres'},
     {type: 'maxlength', message: ' Nombre no exceda los 2 caracteres'},
  ],
 }


 
   private loginForm: FormGroup;
 
   constructor(private seccionService:SeccionService,private usuariosService:UsuariosService, private router: Router,private formBuilder: FormBuilder) {
     this.loginForm =this.formBuilder.group({
       nombre: new FormControl('',Validators.compose([
         Validators.required,
         Validators.minLength(1),
         Validators.maxLength(2),
       
       ])), 
 
     })}

    



  ngOnInit() {
      // metodo para obtener todas las secciones guardadas
    this.getSecciones();


  }




  
/////guardo 
saveSeccion(){
  delete this.seccion.cod_seccion;
  this.seccionService.saveSeccion(this.seccion)
  .subscribe(
    res=> {
      console.log(res);
      this.getSecciones();
      
    },
    err=> console.error(err)

  ) 
}
  
  
  
  
  
  
   ///Metodo para eliminar
deleteSeccion(id: string){
this.seccionService.deleteSeccion(id).subscribe(  /// 
  res => {    
  this.getSecciones();     //pido el meodo de pintar los juegos para que se vea el cambio a la hora de eliminar uno y desaparezca
  location.reload();
  },
  err => console.error(err) );}

  
  
  
//obtengo las secciones  guardadas
getSecciones(){
this.seccionService.getSecciones().subscribe(  /// 
  res => {
  this.secciones= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
  },
  err => console.error(err)
  );}



}
