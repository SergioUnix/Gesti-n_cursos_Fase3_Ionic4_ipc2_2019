import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Ticket} from 'src/app/modelos/Ticket';
import { FormGroup, FormBuilder,FormControl, Validators, NgForm } from '@angular/forms';
import { TicketsService } from 'src/app/servicios/tickets.service';
@Component({
  selector: 'app-ticket-admin',
  templateUrl: './ticket-admin.page.html',
  styleUrls: ['./ticket-admin.page.scss'],
})
export class TicketAdminPage implements OnInit {


 
  tickets: any=[];
  tickets_usuario: any=[];


  public isError=false; 
  public isExito=false; 

ticket:Ticket={    
  cod_ticket: 0,
  asunto: '',
  cuerpo: '',
  cod_estado_fkt: 0,
  cod_usuario_fkt: 0,
}

 
   
     constructor(private ticketsService: TicketsService,private usuariosService:UsuariosService, private router: Router,
       private formBuilder: FormBuilder,private toastCtrl: ToastController) {

    }



 
    

  ngOnInit() {

   // metodo para obtener una lista de tickets realizados por un usuario
   this.getTickets_Usuario();



  }




  
  
//obtengo las secciones  guardadas
getTickets_Usuario(){
  this.ticketsService.getTickets().subscribe(  /// 
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
      
        
  
     ///Metodo para eliminar
     updateEstado(estado:string,id: string){
      this.ticketsService.updateEstado(estado.toString(),id.toString()).subscribe(  /// 
        res => {    
        this.getTickets_Usuario();     //pido el meodo de pintar los juegos para que se vea el cambio a la hora de eliminar uno y desaparezca
        //location.reload();
        },
        err => console.error(err) );}    
  
  
  
  
  
  
  
  







}
