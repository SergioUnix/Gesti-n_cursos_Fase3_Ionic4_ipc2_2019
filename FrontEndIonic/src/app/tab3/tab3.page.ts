import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../servicios/usuarios.service'; ///importo el servicio
import {ConversacionesService} from '../servicios/conversaciones.service'; ///importo el servicio
import { Router } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private conversacionesService:ConversacionesService,
    private usuariosService:UsuariosService,
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController 
     ) {

     }

  conversaciones: any=[];
  mensajes_NoVistos: any=[];
  obtenidos: any=[];
  textoBuscar='';



  
  color_texto="success"
  colores: any ={
  

  };

public contador=0;
public validacion = false;






  async ngOnInit() { 





    const loading = await this.loadingCtrl.create({
      message: 'Cargando Conversaciones..',
    });
    await loading.present();

   this.conversacionesService.conver_un_usuario(this.usuariosService.getSesionNombre().toString(),this.usuariosService.getSesionCod())
   .subscribe(async (con) => {
    this.conversaciones = con;
  
    
    await loading.dismiss();
  },
  async (err) => {console.log('No hay conversaciones creadas aun');
  await loading.dismiss();
}
  );

  }



  buscarUsuario(event){
 const texto = event.target.value;
 this.textoBuscar=texto;
  }



 public fecha='';











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







  getConversaciones(){
    let cod=this.usuariosService.getSesionCod();
    this.conversacionesService.conver_un_usuario(this.usuariosService.getSesionNombre().toString(),cod.toString()).subscribe(  /// 
     res => { //console.log(res);
      this.conversaciones= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
      
    },
      err => {console.log('No hay conversaciones creadas aun');}
      );}
        



    

}
