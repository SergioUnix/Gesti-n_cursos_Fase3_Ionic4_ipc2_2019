import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Asistencia} from 'src/app/modelos/Asistencia';
import { FormGroup, FormBuilder,FormControl, Validators, NgForm } from '@angular/forms';
import { EvaluacionesService} from 'src/app/servicios/evaluaciones.service';
import { AsigEstuService} from 'src/app/servicios/asig-estu.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-asistencia-crear',
  templateUrl: './asistencia-crear.page.html',
  styleUrls: ['./asistencia-crear.page.scss'],
})
export class AsistenciaCrearPage implements OnInit {

  constructor(private asigestuService:AsigEstuService,
    private evaluacionesService:EvaluacionesService, private loadingCtrl: LoadingController,private usuariosService:UsuariosService, private activatedRoute:ActivatedRoute, 
   private router: Router,private formBuilder: FormBuilder,private toastCtrl: ToastController,) {
   
  
  }

usuarios_curso: any=[];


asistencia:Asistencia ={
  cod_asistencia: 0,
  asitencia: '',
  fecha: '',
  Asig_estu_cod_asignacion: 0,

}

public cod_asig_auxiliar=0;

  ngOnInit() {
    const params =this.activatedRoute.snapshot.params;
//console.log(params);
if(params.id){        //este params.id me detecta el numero
  this.cod_asig_auxiliar=params.id;

  this.listUsuariosCurso();

}
  }




saveAsistencia(cod_asig_estudiante:string){
this.asistencia.Asig_estu_cod_asignacion=Number(cod_asig_estudiante);
console.log(this.asistencia);

if(this.asistencia.fecha!=''){
  this.asigestuService.createAsistencia(this.asistencia).subscribe(  /// 
    res => { 
     this.presentToast('Se ha creado la Asistencia');
     },
     err => console.error(err)
     );




}else{

  this.presentToast('No se ha ingresado la fecha');
}




}


  eventoFecha(event){
    const texto = event.target.value;
    const jstoday = formatDate(texto, 'yyy-MM-dd', 'en-Us', '-06');
   this.asistencia.fecha=jstoday;
   console.log(jstoday);
     }
    

eventoAsistencia(event){
const texto = event.target.value;
this.asistencia.asitencia=texto;
console.log(texto);
 }






listUsuariosCurso(){
   ///let cod=this.usuariosService.getSesionCod();
    this.asigestuService.listUsuariosCurso(this.cod_asig_auxiliar.toString()).subscribe(  /// 
     res => { 
      this.usuarios_curso= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
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




}
