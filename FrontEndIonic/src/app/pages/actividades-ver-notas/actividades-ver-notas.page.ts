import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Nota} from 'src/app/modelos/Nota';
import { FormGroup, FormBuilder,FormControl, Validators, NgForm } from '@angular/forms';
import { EvaluacionesService} from 'src/app/servicios/evaluaciones.service';
import { ActividadesService} from 'src/app/servicios/actividades.service';

@Component({
  selector: 'app-actividades-ver-notas',
  templateUrl: './actividades-ver-notas.page.html',
  styleUrls: ['./actividades-ver-notas.page.scss'],
})
export class ActividadesVerNotasPage implements OnInit {

  notas: any=[];
 
  public isError=false; 
  public isExito=false; 
  public isErrorGuardar=false;

public cod_actividad_padre=0;

nota:Nota={    
  cod_nota: 0,
  nota_obtenida: 0,
  Usuario_cod_usuario: 0,
  Actividad_cod_actividad: 0,
}

  constructor(private actividadesService:ActividadesService,
    private evaluacionesService:EvaluacionesService, private loadingCtrl: LoadingController,private usuariosService:UsuariosService, private activatedRoute:ActivatedRoute, 
   private router: Router,private formBuilder: FormBuilder,private toastCtrl: ToastController,) {


  
  }
 
  ngOnInit() {

//Obtengo las actividades creaadar por el usuario auxiliar logueado
this.getNotas();

  

  }









/// obtiene todas las actividades hijas dado el codigo padrea de una actividad
getNotas(){
  let cod=this.usuariosService.getSesionCod();
  this.actividadesService.getactividadesNotas(cod.toString()).subscribe( 
   res => { 
    this.notas= res;  
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