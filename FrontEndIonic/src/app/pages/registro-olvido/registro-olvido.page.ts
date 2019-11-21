import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import {ConversacionesService} from '../../servicios/conversaciones.service'; ///importo el servicio
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Mensaje} from 'src/app/modelos/Mensaje';
import { Usuario} from 'src/app/modelos/Usuario';
import { FormGroup, FormBuilder,FormControl, Validators, NgForm } from '@angular/forms';
@Component({
  selector: 'app-registro-olvido',
  templateUrl: './registro-olvido.page.html',
  styleUrls: ['./registro-olvido.page.scss'],
})
export class RegistroOlvidoPage implements OnInit {
  error_messages ={

    'nombre':[
       {type: 'required', message: 'Nombre requerido'},
       {type: 'minlength', message: 'Nombre tamaño minimo de 3 caracteres'},
       {type: 'maxlength', message: ' Nombre no exceda los 45 caracteres'},
    ],
   }
   private loginForm: FormGroup;

  constructor(private conversacionesService:ConversacionesService,
    private usuariosService:UsuariosService,
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private activatedRoute:ActivatedRoute,
    private formBuilder: FormBuilder 
     ) {
      this.loginForm =this.formBuilder.group({
        nombre: new FormControl('',Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(45),
        
        ])),
  
  
      })
  


     }



     usuario: Usuario ={
      cod_usuario: 0,
      nombre: '',
      carne: '',
      correo: '',
      pasword: '',
      cod_rol_fk: 0,
    };
  

     mensaje: Mensaje ={
      cod_mensaje: 0,
      asunto:'Recuperacion de Contraseña',
      cuerpo:'',
      archivos_adjuntos:'',
      fecha: '',
      cod_usuario_remitente: 1,
      cod_usuario_destinatario:0,
    };
  
    usuarios: any=[];
  mensajes: any=[];
  public cod_usuario_destinatario=0;





 ngOnInit() {
  


  }

 aleatorio(a,b) {
    return Math.round(Math.random()*(b-a)+parseInt(a));
  }

  public correo=''; 
//El metodo que verifica si existe el correo esta en el servicio de Conversasiones
//recibe un correo y devuelve datos del usuario
  existUsuario(){     
    this.conversacionesService.existCorreo(this.correo.toString())
    .subscribe(
    res=> {      
      this.usuario=res;
      console.log(this.usuario);
      this.cod_usuario_destinatario=this.usuario.cod_usuario;
      //obtengo una contraseña aleatoria
      const passNew = 'Aleatoria'+ this.aleatorio(0,100);
      //Actualizo la contraseña aleatoria
      this.updateUsuario(passNew);
      //envio mensaje de cual es la contraseña aleatoria, lo envia el administrador
      this.saveMensaje(passNew);

      this.presentToast('Contraseña enviada correctamente al Correo')



      },
    err=>{ this.presentToast('El correo no existe en el sistema');
     
    }
    )}
    
        
  //Actualizo el Usuario
  updateUsuario(passNew:string){
    const numero =this.usuario.cod_usuario;
    delete this.usuario.cod_usuario;
    this.usuario.pasword=passNew;
    console.log(this.usuario);
    this.usuariosService.updateUsuario(numero.toString(), this.usuario)
    .subscribe(
    res =>{
    console.log(res);
    //this.router.navigate(['/lista-usuarios']);
    },
    err => console.error(err)
          
    )
    }


   //Guardar Mensaje
   saveMensaje(passNew:string){    

    delete this.mensaje.cod_mensaje;
    delete this.mensaje.fecha;
    delete this.mensaje.archivos_adjuntos;
    this.mensaje.cuerpo='Tu Contraseña Aleatoria es: '+passNew;
    this.mensaje.cod_usuario_destinatario =this.cod_usuario_destinatario;

    console.log(this.mensaje);
   
    this.conversacionesService.createMensaje(this.mensaje)
    .subscribe(
      res=> { 
      
      this.correo ='';
       this.presentToast('Mensaje Enviado');
      },
      err=>{ 
        this.presentToast('No se guardo el mensaje ')

      
      }); 
  
  
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













      
  //obtengo los horarios guardados
  getUsuarios(){
    this.usuariosService.getUsuarios().subscribe(  /// 
      res => {
      this.usuarios= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
      },
      err => console.error(err)
      );}
      



}