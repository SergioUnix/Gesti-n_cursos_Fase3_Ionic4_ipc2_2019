import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Horario } from 'src/app/modelos/Horario';   //importo el tipo de dato,
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HorariosService {
  // Creo una variable con mi dirección
  API_URI = 'http://localhost:3000/api';


constructor(private http: HttpClient,private router:Router) {   }



//metodo para pedir 
getHorarios(){
return this.http.get(`${this.API_URI}/horarios`);
}
//metodo para obtener 
getHorario(id: string){
return this.http.get(`${this.API_URI}/horarios/${id}`);
}

//metodo para guardar 
saveHorario(horario:Horario){
return this.http.post(`${this.API_URI}/horarios`, horario);

}
//metodo de borrar
deleteHorario(id: string){
return this.http.delete(`${this.API_URI}/horarios/${id}`);
}
//metodo de actualizar 
updateHorario(id:string, updated:Horario){
return this.http.put(`${this.API_URI}/horarios/${id}`, updated);

}

}
