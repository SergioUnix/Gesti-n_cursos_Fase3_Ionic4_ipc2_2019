import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import {ConversacionesService} from '../../servicios/conversaciones.service'; ///importo el servicio
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Mensaje} from 'src/app/modelos/Mensaje';

@Component({
  selector: 'app-destinatario',
  templateUrl: './destinatario.page.html',
  styleUrls: ['./destinatario.page.scss'],
})
export class DestinatarioPage implements OnInit {

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
  
    usuarios: any=[];
  mensajes: any=[];
  public cod_destinatario=0;





  async ngOnInit() {
    //obtengo primero todos los usuarios
    this.getUsuarios();




   
          


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




       //capto el codigo del auxiliar
       eventoUsuario(event){
        const texto = event.target.value;
        this.mensaje.cod_usuario_destinatario=Number(texto);
       console.log(texto);
         }







   //Guardar Mensaje
   saveMensaje(){    

    delete this.mensaje.cod_mensaje;
    delete this.mensaje.fecha;

    this.mensaje.cod_usuario_remitente = Number(this.usuariosService.getSesionCod());
    console.log(this.mensaje);

    if(this.mensaje.cuerpo!=''&& this.mensaje.asunto !=''){
    this.conversacionesService.createMensaje(this.mensaje)
    .subscribe(
      res=> { 
      
      this.mensaje.cuerpo ='';
      this.mensaje.asunto='';
      this.presentToast('Mensaje Enviado');
      },
      err=>{ 
        this.presentToast('No se guardo el mensaje ')

      
      }); 
  
    }else{this.presentToast('No se guardo el mensaje ya que faltan datos');}
      }


 






      
  //obtengo los horarios guardados
  getUsuarios(){
    this.usuariosService.getUsuarios().subscribe(  /// 
      res => {
      this.usuarios= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
      },
      err => console.error(err)
      );}
      



}