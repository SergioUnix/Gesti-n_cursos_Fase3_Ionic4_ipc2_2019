import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';     /// modulo encargado de hacer las peticiones http
import {Mensaje} from '../modelos/Mensaje';          //importo tipo interfaz 
import { Observable } from 'rxjs';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ConversacionesService {
  // Creo una variable con mi dirección
  API_URI = 'http://localhost:3000/api';
  public logeado=null;   ///me dice si el usuario esta loogeado

constructor(private http: HttpClient,private router:Router) {   }



//metodo para logearse -----------------
conver_un_usuario(nombre: string, cod_usuario: string){
  return this.http.get(`${this.API_URI}/conversaciones/${nombre}/${cod_usuario}`);
  }
/// metodo obtiene mensajes entre dos usuarios --------------
  mensajes_dos_usuarios(cod_remitente: string,cod_destinatario:string){
    return this.http.get(`${this.API_URI}/conversaciones/1/${cod_remitente}/${cod_destinatario}`);
    }

/// metodo obtiene mensajes entre dos usuarios --------------
existCorreo(correo: string){
  return this.http.get(`${this.API_URI}/conversaciones/exist/correo/usuario/${correo}`);
  }
/// metodo obtiene mensajes entre dos usuarios --------------
recuperar(correo: string,pass:string){
  return this.http.get(`${this.API_URI}/conversaciones/exist/correo/usuario/${correo}/${pass}`);
  }


  
//crear mensajes ----------------------
createMensaje(mensaje:Mensaje){
  return this.http.post(`${this.API_URI}/conversaciones`, mensaje);
  
  }

///Metodo pasa a Disponible un curso
updateEliminar(id:string, u:string){
  return this.http.put(`${this.API_URI}/conversaciones/${id}`, u);
  
  }



}
