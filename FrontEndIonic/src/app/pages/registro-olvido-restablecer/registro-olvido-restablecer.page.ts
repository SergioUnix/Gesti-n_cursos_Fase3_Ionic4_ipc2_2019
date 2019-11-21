import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import {ConversacionesService} from '../../servicios/conversaciones.service'; ///importo el servicio
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Mensaje} from 'src/app/modelos/Mensaje';
import { Usuario} from 'src/app/modelos/Usuario';
import { FormGroup, FormBuilder,FormControl, Validators, NgForm } from '@angular/forms';
@Component({
  selector: 'app-registro-olvido-restablecer',
  templateUrl: './registro-olvido-restablecer.page.html',
  styleUrls: ['./registro-olvido-restablecer.page.scss'],
})
export class RegistroOlvidoRestablecerPage implements OnInit {
  error_messages ={

    'nombre':[
       {type: 'required', message: 'Nombre requerido'},
       {type: 'minlength', message: 'Nombre tamaño minimo de 3 caracteres'},
       {type: 'maxlength', message: ' Nombre no exceda los 45 caracteres'},
    ],
    
   'password':[
    {type: 'required', message: 'Password requerido'},
    {type: 'minlength', message: 'Password tamaño minimo de 3 caracteres'},
    {type: 'maxlength', message: ' Password no exceda los 25 caracteres'},
  ],
  
  'password2':[
    {type: 'required', message: 'Password requerido'},
    {type: 'minlength', message: 'Password tamaño minimo de 3 caracteres'},
    {type: 'maxlength', message: ' Password no exceda los 25 caracteres'},
  ],
  
  
  'password3':[
    {type: 'required', message: 'Password requerido'},
    {type: 'minlength', message: 'Password tamaño minimo de 3 caracteres'},
    {type: 'maxlength', message: ' Password no exceda los 25 caracteres'},
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
        password: new FormControl('',Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        
        ])),
        password2: new FormControl('',Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        
        ])),
        password3: new FormControl('',Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        
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
  public password1='';
  public password2='';
  public password3='';




 ngOnInit() {
  


  }

 aleatorio(a,b) {
    return Math.round(Math.random()*(b-a)+parseInt(a));
  }

  public correo=''; 
//El metodo que verifica si existe el correo esta en el servicio de Conversasiones
//recibe un correo y devuelve datos del usuario
  existUsuario(){   
    
    if(this.password2=this.password3){
    this.conversacionesService.recuperar(this.correo.toString(),this.password1)
    .subscribe(
    res=> {      
      this.usuario=res;
      console.log(this.usuario);
      //obtengo una contraseña aleatoria
      //Actualizo la contraseña
      this.updateUsuario(this.password2);


      this.presentToast('Contraseña Cambiada Correctamente')



      },
    err=>{ this.presentToast('Correo o contraseña Incorrectos ');
     
    }
    )
  }else{this.presentToast('Las contraseñas no coinciden')}  
  
  
  
  }
    
        
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