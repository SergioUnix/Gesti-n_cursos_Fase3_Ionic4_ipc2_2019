import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Ticket} from 'src/app/modelos/Ticket';
import { FormGroup, FormBuilder,FormControl, Validators, NgForm } from '@angular/forms';
import { TicketsService } from 'src/app/servicios/tickets.service';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {

  error_messages ={

    'nombre':[
       {type: 'required', message: 'Asunto requerido'},
       {type: 'minlength', message: 'Asunto tamaño minimo de 3 caracteres'},
       {type: 'maxlength', message: ' Asunto no exceda los 30 caracteres'},
    ],
    'carne':[
     {type: 'required', message: 'Cuerpo requerido'},
     {type: 'minlength', message: 'Cuerpo tamaño minimo de 3 caracteres'},
     {type: 'maxlength', message: ' Cuerpo no exceda los 250 caracteres'},
   ],
   }
 
 
   
     private loginForm: FormGroup;
   
     constructor(private ticketsService: TicketsService,private usuariosService:UsuariosService, private router: Router,
       private formBuilder: FormBuilder,private toastCtrl: ToastController) {
       this.loginForm =this.formBuilder.group({
         nombre: new FormControl('',Validators.compose([
           Validators.required,
           Validators.minLength(3),
           Validators.maxLength(30),
         
         ])),
         carne: new FormControl('',Validators.compose([
           Validators.required,
           Validators.minLength(3),
           Validators.maxLength(250),
         
         ])),
 

    })
   
    }


    tickets: any=[];
    tickets_usuario: any=[];
  

    ticket:Ticket={    
      cod_ticket: 0,
      asunto: '',
      cuerpo: '',
      cod_estado_fkt: 0,
      cod_usuario_fkt: 0,
    }
    

  ngOnInit() {

    // metodo para obtener una lista de tickets realizados por un usuario
    this.getTickets_Usuario();




  }





/////guardo 
saveTicket(){
  let cod=this.usuariosService.getSesionCod();
  delete this.ticket.cod_ticket;
  delete this.ticket.cod_estado_fkt;
  this.ticket.cod_usuario_fkt=Number(cod);
  this.ticket.cod_estado_fkt =1;
   console.log(this.ticket);
  this.ticketsService.saveTicket(this.ticket)
  .subscribe(
    res=> {
      console.log(res);
      this.getTickets_Usuario();

    },
    err=> console.error(err)

  ) 
}
  
  
  
  
  

  
  
//obtengo las secciones  guardadas
getTickets_Usuario(){
this.ticketsService.getTickets_Usuario(this.usuariosService.getSesionCod().toString()).subscribe(  /// 
  res => {
  this.tickets_usuario= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
  },
  err =>{ console.log('No se encontraron Tickets');    }
  );}















   ///Metodo para eliminar
   deleteTicket(id: string){
    this.ticketsService.deleteTicket(id).subscribe(  /// 
      res => {    
      this.getTickets_Usuario();     //pido el meodo de pintar los juegos para que se vea el cambio a la hora de eliminar uno y desaparezca
      location.reload();
      },
      err => console.error(err) );}
    
      












}
