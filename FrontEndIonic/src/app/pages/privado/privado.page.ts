import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import {ConversacionesService} from '../../servicios/conversaciones.service'; ///importo el servicio
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Mensaje} from 'src/app/modelos/Mensaje';

@Component({
  selector: 'app-privado',
  templateUrl: './privado.page.html',
  styleUrls: ['./privado.page.scss'],
})
export class PrivadoPage implements OnInit {

  constructor(private conversacionesService:ConversacionesService,
    private usuariosService:UsuariosService,
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private activatedRoute:ActivatedRoute 
     ) {}


     mensaje: Mensaje ={
      cod_mensaje: 0,
      asunto:'',
      cuerpo:'',
      archivos_adjuntos:'',
      fecha: '',
      cod_usuario_remitente: 0,
      cod_usuario_destinatario:0,
    };
  

  mensajes: any=[];
  public cod_destinatario=0;


  async ngOnInit() {
    const params =this.activatedRoute.snapshot.params;
     if(params.id){  
      this.cod_destinatario=params.id;

      const loading = await this.loadingCtrl.create({
        message: 'Cargando Conversaciones..',
      });
      await loading.present();
   
     this.conversacionesService.mensajes_dos_usuarios(this.usuariosService.getSesionCod(),this.cod_destinatario.toString())
     .subscribe(async (con) => {
      this.mensajes = con;
      console.log(this.mensajes)
      await loading.dismiss();
    },
    async (err) => {console.log('No hay conversaciones creadas aun');
    await loading.dismiss();
  });







    }
          


  }

  async openAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Nueva Conversación!',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'aqui la tarea'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Crear',
          handler: (data) => {
           // this.createTask(data.title);
          }
        }
      ]
    });
    await alert.present();
  }



  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    await toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando..',
      duration: 2000
    });
    await loading.present();
    return loading;
  }










   //Guardar Mensaje
   saveMensaje(){    

    delete this.mensaje.cod_mensaje;
    delete this.mensaje.fecha;

    this.mensaje.cod_usuario_remitente = Number(this.usuariosService.getSesionCod());
    this.mensaje.cod_usuario_destinatario= this.cod_destinatario;

    if(this.mensaje.cuerpo!=''&& this.mensaje.asunto !=''){
    this.conversacionesService.createMensaje(this.mensaje)
    .subscribe(
      res=> { 
      this.getMensajes();
      this.mensaje.cuerpo ='';
      this.mensaje.asunto='';
      this.mensaje.archivos_adjuntos='';
      this.presentToast('Mensaje Enviado');
      },
      err=>{ 
        this.presentToast('No se guardo el mensaje ')

      
      }); 
  
    }else{this.presentToast('No se guardo el mensaje ya que faltan datos');}
      }


      
      deleteMensaje(cod_mensaje){
        this.conversacionesService.updateEliminar(cod_mensaje,"").subscribe(  /// 
          res => {
           this.getMensajes();
           },
          err => console.error(err)
        );
      }
      


  getMensajes(){
    let cod=this.usuariosService.getSesionCod();
    this.conversacionesService.mensajes_dos_usuarios(this.usuariosService.getSesionCod(),this.cod_destinatario.toString())
     .subscribe(  /// 
     res => { //console.log(res);
      this.mensajes= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
      
    },
      err => {console.log('No hay conversaciones creadas aun');}
      );}
        




}