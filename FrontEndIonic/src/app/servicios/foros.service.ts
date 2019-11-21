import { Injectable } from '@angular/core';
import { Foro } from 'src/app/modelos/Foro';   //importo el tipo de dato,
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Publicacion } from 'src/app/modelos/Publicacion';   //importo el tipo de dato,

@Injectable({
  providedIn: 'root'
})
export class ForosService {
    // Creo una variable con mi dirección
    API_URI = 'http://localhost:3000/api';


  constructor(private router:Router, private http:HttpClient) { }



  //metodo para pedir 
  getForos(){
  return this.http.get(`${this.API_URI}/foros`);
  }



  //metodo para obtener 
  getForo(id: string){
  return this.http.get(`${this.API_URI}/foros/${id}`);
  }
  
  //metodo para guardar 
  saveforo(foro:Foro){
  return this.http.post(`${this.API_URI}/foros`, foro);
  
  }
  //metodo de borrar
  deleteForo(id: string){
  return this.http.delete(`${this.API_URI}/foros/${id}`);
  }
  //metodo de actualizar 
  updateForo(id:string, updated:Foro){
  return this.http.put(`${this.API_URI}/foros/${id}`, updated);
  
  }


 
  //metodo para pedir 
  getPadres(id: string){
  return this.http.get(`${this.API_URI}/foros/padres/padres/pa/${id}`);
  }
 


  //metodo para obtener 
  getHijos(id: string){
  return this.http.get(`${this.API_URI}/foros/hijos/hijos/${id}`);
  }


  //metodo para guardar 
  savePadre(publicacion:Publicacion){
  return this.http.post(`${this.API_URI}/foros/padre`, publicacion);
    
  }
  //metodo para guardar 
  saveHijo(publicacion:Publicacion){
  return this.http.post(`${this.API_URI}/foros/hijo/pu`, publicacion);
   
  }

  //actualiza un me gusta
  meGusta(id:string, updated:Publicacion){
    return this.http.put(`${this.API_URI}/foros/meGusta/${id}`, updated);
    
    }





}
