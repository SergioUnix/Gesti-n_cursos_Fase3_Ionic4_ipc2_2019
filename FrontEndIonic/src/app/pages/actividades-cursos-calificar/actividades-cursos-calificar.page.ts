import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Actividad } from 'src/app/modelos/Actividad';
import { FormGroup, FormBuilder,FormControl, Validators, NgForm } from '@angular/forms';
import { EvaluacionesService} from 'src/app/servicios/evaluaciones.service';
import { ActividadesService} from 'src/app/servicios/actividades.service';
@Component({
  selector: 'app-actividades-cursos-calificar',
  templateUrl: './actividades-cursos-calificar.page.html',
  styleUrls: ['./actividades-cursos-calificar.page.scss'],
})
export class ActividadesCursosCalificarPage implements OnInit {


  constructor(private actividadesService:ActividadesService,
    private evaluacionesService:EvaluacionesService, private loadingCtrl: LoadingController,private usuariosService:UsuariosService, private activatedRoute:ActivatedRoute, 
   private router: Router,private formBuilder: FormBuilder,private toastCtrl: ToastController,) {


  
  }
  asignaciones: any=[];
  actividades_user: any=[];

  public isError=false; 
  public isExito=false; 
  public isErrorGuardar=false;


public anio:string='';
public mes:string='';
public dia:string ='';

public hora:string='';
public minuto:string=''; 

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



  ngOnInit() {

//Obtengo las actividades creaadar por el usuario auxiliar logueado
this.getActividades_user();

  

  }




  ///obtiene todas las asignaciones que se han hecho de auxiliares
  getActividades_user(){
    let cod=this.usuariosService.getSesionCod();
    this.actividadesService.getList_user(cod.toString()).subscribe(  /// 
     res => { //console.log(res);
      this.actividades_user= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
      },
      err => console.error(err)
      );}
        



    async presentToast(message: string) {
      const toast = await this.toastCtrl.create({
        message,
        duration: 3000
      });
      await toast.present();
    }
  









}
