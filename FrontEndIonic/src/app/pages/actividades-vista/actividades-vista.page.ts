import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Actividad} from 'src/app/modelos/Actividad';
import { FormGroup, FormBuilder,FormControl, Validators, NgForm } from '@angular/forms';
import { EvaluacionesService} from 'src/app/servicios/evaluaciones.service';
import { ActividadesService} from 'src/app/servicios/actividades.service';

@Component({
  selector: 'app-actividades-vista',
  templateUrl: './actividades-vista.page.html',
  styleUrls: ['./actividades-vista.page.scss'],
})
export class ActividadesVistaPage implements OnInit {
  asignaciones: any=[];
  actividades_curso: any=[];
  

  public cod_asig_curso=0;
actividad:Actividad={    
  cod_actividad:0,
  nombre: '',
  hora: '',
  fecha_limite: '',
  ponderacion: '',
  archivo: '',
  texto: '',
  ruta_archivo: '',
  cod_asignacion_auxiliar_fk: 0,
  cod_usuario_fk: 0,
}

  constructor(private actividadesService:ActividadesService,
    private evaluacionesService:EvaluacionesService, private loadingCtrl: LoadingController,private usuariosService:UsuariosService, private activatedRoute:ActivatedRoute, 
   private router: Router,private formBuilder: FormBuilder,private toastCtrl: ToastController,) {
   
  
  }

  ngOnInit() {


const params =this.activatedRoute.snapshot.params;
//console.log(params);
if(params.id){        //este params.id me detecta el numero
  this.cod_asig_curso=params.id;

  this.getActividades_curso();

}
  }







  ///obtiene todas las actividades de un curso
  getActividades_curso(){
    ///let cod=this.usuariosService.getSesionCod();
    this.actividadesService.getActividades_curso(this.cod_asig_curso.toString()).subscribe(  /// 
     res => { 
      this.actividades_curso= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
      },
      err => console.error(err)
      );}
        





}
