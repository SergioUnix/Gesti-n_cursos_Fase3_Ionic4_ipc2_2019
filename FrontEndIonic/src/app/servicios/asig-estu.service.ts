import { Injectable, HostBinding } from '@angular/core';
import {Asig_Estu} from 'src/app/modelos/Asig_Estu';   //importo el tipo de dato,
import {Asistencia} from 'src/app/modelos/Asistencia';   //importo el tipo de dato,
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AsigEstuService {
  // Creo una variable con mi dirección
  API_URI = 'http://localhost:3000/api';


constructor(private router:Router, private http:HttpClient) { }



//metodo para pedir 
getAsig_estudiantes(){
  return this.http.get(`${this.API_URI}/asig_estudiante`);
  }
  //metodo para obtener 
  getAsig_estudiante(id: string){
  return this.http.get(`${this.API_URI}/asig_estudiante/${id}`);
  }
  
  //metodo para guardar 
  saveAsig_estudiante(curso:Asig_Estu){
  return this.http.post(`${this.API_URI}/asig_estudiante`, curso);
  
  }
  //metodo de borrar
  deleteAsig_estudiante(id: string){
  return this.http.delete(`${this.API_URI}/asig_estudiante/${id}`);
  }
  //metodo de actualizar 
  updateAsig_estudiante(id:string, updated:Asig_Estu){
  return this.http.put(`${this.API_URI}/asig_estudiante/${id}`, updated);
  
  }

 //metodo para ver si hay asignacion en dicho curso del respectivo usuario
 existAsig(asig: string, id:string ){
  return this.http.get(`${this.API_URI}/asig_estudiante/existe/${asig}/${id}`);
  }



 //metodo para obtener todos los cursos asignados por el estudiante
 getCursos_asignados(id: string){
 return this.http.get(`${this.API_URI}/asig_estudiante/usuario/${id}`);
 }
  
 //metodo para obtener todos los cursos asignados por el estudiante
 listUsuariosCurso(id: string){
  return this.http.get(`${this.API_URI}/asig_estudiante/usuarios/de/un/curso/${id}`);
  }



  //metodo para guardar 
  createAsistencia(asistencia:Asistencia){
    return this.http.post(`${this.API_URI}/asig_estudiante/asistencia`, asistencia);
    
    }

}
