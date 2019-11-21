import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Ticket } from 'src/app/modelos/Ticket';   //importo el tipo de dato,
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  // Creo una variable con mi dirección
  API_URI = 'http://localhost:3000/api';


constructor(private http: HttpClient,private router:Router) {   }



//metodo devuelve lista de todos los tickets no importa que usuario sea------
getTickets(){
return this.http.get(`${this.API_URI}/tickets`);
}
//metodo devuelve lista de tickets realizada por un usuario dado un cod_usuario-------
getTickets_Usuario(id: string){
return this.http.get(`${this.API_URI}/tickets/${id}`);
}

//metodo para guardar ticket -----------
saveTicket(ticket:Ticket){
return this.http.post(`${this.API_URI}/tickets`, ticket);

}
//metodo de borrar
deleteTicket(id: string){
return this.http.delete(`${this.API_URI}/tickets/${id}`);
}
//metodo de actualizar 
updateTicket(id:string, updated: Ticket){
return this.http.put(`${this.API_URI}/tickets/${id}`, updated);

}

//metodo de actualizar 
updateEstado(estado:string, id: string){
  return this.http.put(`${this.API_URI}/tickets/estado/${estado}/${id}`, id);
  
  }



}
