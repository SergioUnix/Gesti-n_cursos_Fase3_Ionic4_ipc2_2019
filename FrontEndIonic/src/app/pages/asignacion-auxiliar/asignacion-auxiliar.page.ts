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
  selector: 'app-asignacion-auxiliar',
  templateUrl: './asignacion-auxiliar.page.html',
  styleUrls: ['./asignacion-auxiliar.page.scss'],
})
export class AsignacionAuxiliarPage implements OnInit {
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
  
    ngOnInit() {

         ///Obtengo los usuarios Auxiliares
   this.getUsuarios_Aux();
   ///Obtengo los cursos disponibles
   this.getCursos_dis();
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
crearForo(cod_ultima_asig){
  
  this.foro.nombre='Foro del curso';
  this.foro.descripcion='Publicar aca';
  const today= new Date();
  const fecha = formatDate(today, 'yyy-MM-dd', 'en-Us', '-06');
  this.foro.fecha=fecha;
  const hora = formatDate(today, 'HH:mm:ss', 'en-Us', '-06');
  this.foro.hora_limite=hora;
  this.foro.cod_asignacion_auxiliar_fk=Number(cod_ultima_asig);

  delete this.foro.cod_foro;
  this.asigauxService.createForoAsig(this.foro).subscribe(  /// 
    res => {
    console.log(res);    
    },
    err => console.error(err)
    );}


///obtengo el ultimo registro que me servira para crear un Foro automaticamente
ultimo_registro(cod_usuario_fk){
  let ultimo;
  this.asigauxService.getUltimaAsignacion(cod_usuario_fk).subscribe(  /// 
    res => {
    ultimo=res;
    //console.log(ultimo.cod_asignacion_auxiliar);
    this.crearForo(ultimo.cod_asignacion_auxiliar);

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


 //Guardar Auxiliar
  saveAsig(){   
    const cod_curso_fk =this.asig_aux.cod_curso_fk;
    const cod_auxiliar =this.asig_aux.cod_usuario_fk;
   
    

    delete this.asig_aux.cod_asignacion_auxiliar;
    this.asigauxService.saveAsig_aux(this.asig_aux)
    .subscribe(
      res=> { 
      this.presentToast('Auxiliar Asignado');
      this.getUsuarios_Aux();
      //cambio el estado
      this.cambioOcupado(cod_curso_fk.toString());
      //obtengo el codigo de la asignacion creada y envio a crear foro
      this.ultimo_registro(cod_auxiliar.toString());
      
      //repinto las asignaciones
      this.getAsig_Aux(); 
  

      },
      err=>{
        this.presentToast('Auxiliar No se asigno');
      }
    ) 
  
  
      }









   ///Metodo para eliminar
   deleteAsignacion(id: string, cod_curso:string){
    this.asigauxService.deleteAsig_aux(id).subscribe(  /// 
      res => {    
        this.getAsig_Aux();     //repinto para que se vea el cambio a la hora de eliminar uno y desaparezca
      this.cambioDisponible(cod_curso.toString());
        location.reload();
      },
      err => console.error(err) );}




//obtengo cursos disponibles que aun no han sido asignados a un auxiliar
getCursos_dis(){
  this.cursosService.getCursos_dis().subscribe(  /// 
    res => {
    this.cursos_dis= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
    },
    err => console.error(err)
    );}




//obtengo los auxiliares guardados
getUsuarios_Aux(){
  this.usuariosService.getUsuarios_auxiliares().subscribe(  /// 
    res => {
    this.usuarios= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
    },
    err => console.error(err)
    );}
    
//Capto el semestre
  eventoSemestre(event){
    const texto = event.target.value;
    this.asig_aux.semestre= texto;
   console.log(texto);
     }

///Capto el año
     eventoAno(event){
      const texto = event.target.value;
    this.asig_aux.año=Number(texto);
     console.log(texto);
       }
  //Capto la fecha
  eventoFecha(event){
    const texto = event.target.value;
    const jstoday = formatDate(texto, 'yyy-MM-dd', 'en-Us', '-06');
    this.asig_aux.fecha_limite=jstoday;
   console.log(jstoday);
     }
    
     //capto el codigo del auxiliar
     eventoAuxiliar(event){
      const texto = event.target.value;
      this.asig_aux.cod_usuario_fk=texto;
     console.log(texto);
       }
       ///Capto el cod del curso
  eventoCurso(event){
    const texto = event.target.value;
    this.asig_aux.cod_curso_fk = texto;
   console.log(texto);
     }

  
 
  
  
  }
  