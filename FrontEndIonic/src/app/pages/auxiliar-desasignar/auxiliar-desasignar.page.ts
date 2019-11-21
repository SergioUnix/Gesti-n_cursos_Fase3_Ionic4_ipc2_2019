import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import { CursosService } from 'src/app/servicios/cursos.service';
import { AsigAuxService} from 'src/app/servicios/asig-aux.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Asig_Aux} from 'src/app/modelos/Asig_Aux';
import { Foro} from 'src/app/modelos/Foro';
import { FormGroup, FormBuilder,FormControl, Validators, NgForm } from '@angular/forms';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-auxiliar-desasignar',
  templateUrl: './auxiliar-desasignar.page.html',
  styleUrls: ['./auxiliar-desasignar.page.scss'],
})
export class AuxiliarDesasignarPage implements OnInit {
  usuarios: any=[];
  cursos_dis: any=[];

  asig_Auxiliares: any=[];

  public isError=false; 
  public isExito=false; 
  public isErrorGuardar=false;

public anio:string='';
public mes:string='';
public dia:string ='';

public anio_asig=0;

asig_aux:Asig_Aux={
  cod_asignacion_auxiliar: 0,
  
  semestre: '',
  año: 0,
  fecha_limite: '',
  cod_usuario_fk: 0,
  cod_curso_fk: 0,
}

foro:Foro={
  cod_foro: 0,
  nombre: '',
  descripcion: '',
  fecha: '',
  hora_limite: '',
  cod_asignacion_auxiliar_fk: 0,

}

  
  
    constructor(private usuariosService:UsuariosService, private router: Router,
      private formBuilder: FormBuilder,
      private asigauxService:AsigAuxService,private cursosService:CursosService
      ,private toastCtrl: ToastController) {
     
  
  
     }

     
    public nombre='';
    public carne=''; 
    public correo='';
    public pass='';
  

    filterPost ='';

    ngOnInit() {

         ///Obtengo los usuarios Auxiliares
   this.getUsuarios_Aux();

   //Obtengo todas las asignaciones de auxiliares que se han realizado
  this.getAsig_Aux();

    }
  





    async presentToast(message: string) {
      const toast = await this.toastCtrl.create({
        message,
        duration: 3000
      });
      await toast.present();
    }
  
  

/// crear foro despues de haber obtenido la ultima asignacion_auxiliar
crearForo(cod_asignacion_auxiliar_fk){

  this.asigauxService.deleteForo(cod_asignacion_auxiliar_fk).subscribe(  /// 
    res => {
    console.log(res);    
    },
    err => console.error(err)
    );}






///obtiene todas las asignaciones que se han hecho de auxiliares
getAsig_Aux(){
  this.asigauxService.getAsig_auxiliares().subscribe(  /// 
    res => {
    this.asig_Auxiliares= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
    },
    err => console.error(err)
    );}



 

//metodo para cambiar el estado del curso , porque ya se le asigno un auxiliar
cambioOcupado(codigo_curso:String){
  this.cursosService.updateOcupado(codigo_curso.toString(),"").subscribe(  /// 
    res => {
    console.log("cambio de estado")  
    },
    err => console.error(err)
    );}
//metodo para cambiar el estado del curso , porque ya se le asigno un auxiliar
cambioDisponible(codigo_curso:String){
  this.cursosService.updateDisponible(codigo_curso.toString(),"").subscribe(  /// 
    res => {
    console.log("cambio de estado")  
    },
    err => console.error(err)
    );}










   ///Metodo para eliminar
   deleteAsignacion(id: string, cod_curso:string){
    this.asigauxService.deleteAsig_aux(id).subscribe(  /// 
      res => {    
        this.getAsig_Aux();     //repinto para que se vea el cambio a la hora de eliminar uno y desaparezca
      this.cambioDisponible(cod_curso.toString());
        location.reload();
      },
      err => console.error(err) );}






//obtengo los auxiliares guardados
getUsuarios_Aux(){
  this.usuariosService.getUsuarios_auxiliares().subscribe(  /// 
    res => {
    this.usuarios= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
    },
    err => console.error(err)
    );}
    


  
 
  
  
  }
  