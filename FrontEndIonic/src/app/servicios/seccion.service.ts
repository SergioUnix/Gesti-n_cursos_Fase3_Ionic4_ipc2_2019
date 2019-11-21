import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Seccion } from 'src/app/modelos/Seccion';   //importo el tipo de dato,

@Injectable({
  providedIn: 'root'
})
export class SeccionService {
    // Creo una variable con mi dirección
    API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient,private router:Router) {   }





//metodo para pedir 
getSecciones(){
  return this.http.get(`${this.API_URI}/seccion`);
  }
  //metodo para obtener 
  getSeccion(id: string){
  return this.http.get(`${this.API_URI}/seccion/${id}`);
  }
  
  //metodo para guardar 
  saveSeccion(seccion:Seccion){
  return this.http.post(`${this.API_URI}/seccion`, seccion);
  
  }
  //metodo de borrar
  deleteSeccion(id: string){
  return this.http.delete(`${this.API_URI}/seccion/${id}`);
  }
  //metodo de actualizar 
  updateSeccion(id:string, updated:Seccion){
  return this.http.put(`${this.API_URI}/seccion/${id}`, updated);
  
  }
  












}
