import { Injectable } from '@angular/core';
import { Curso } from 'src/app/modelos/Curso';   //importo el tipo de dato,
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CursosService {
    // Creo una variable con mi dirección
    API_URI = 'http://localhost:3000/api';


  constructor(private router:Router, private http:HttpClient) { }



//metodo para pedir 
  getCursos(){
  return this.http.get(`${this.API_URI}/cursos`);
  }


 //metodo para pedir cursos disponibles que aun no han sido asignados a algun auxiliar
 getCursos_dis(){
  return this.http.get(`${this.API_URI}/cursos/disponibles/dis`);
  }

  //metodo para obtener 
  getCurso(id: string){
  return this.http.get(`${this.API_URI}/cursos/${id}`);
  }
  
  //metodo para guardar 
  saveCurso(curso:Curso){
  return this.http.post(`${this.API_URI}/cursos`, curso);
  
  }
  //metodo de borrar
  deleteCurso(id: string){
  return this.http.delete(`${this.API_URI}/cursos/${id}`);
  }
  //metodo de actualizar 
  updateCurso(id:string, updated:Curso){
  return this.http.put(`${this.API_URI}/cursos/${id}`, updated);
  
  }


///Metodo pasa a Disponible un curso
updateDisponible(id:string, u:string){
  return this.http.put(`${this.API_URI}/cursos/Disponi/${id}`, u);
  
  }
/// Metodo para a Ocupado un curso
updateOcupado(id:string, u:string){
  return this.http.put(`${this.API_URI}/cursos/Ocupado/Ocu/${id}`, u);
  
  }


 //metodo para ver si hay asignacion en dicho curso del respectivo usuario
 exist(curso: string, seccion:string ){
  return this.http.get(`${this.API_URI}/cursos/validar/${curso}/${seccion}`);
  }





}
