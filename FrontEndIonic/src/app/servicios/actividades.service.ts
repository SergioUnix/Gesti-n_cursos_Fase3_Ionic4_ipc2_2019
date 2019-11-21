import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Actividad } from 'src/app/modelos/Actividad';   //importo el tipo de dato,
import { Nota } from 'src/app/modelos/Nota';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class ActividadesService {
  // Creo una variable con mi dirección
  API_URI = 'http://localhost:3000/api';


constructor(private http: HttpClient,private router:Router) {   }



//metodo devuelve lista 
getActividades(){
return this.http.get(`${this.API_URI}/actividades`);
}
//Actividades realizadas por un usuario dado un cod_usuario_fk-------
getList_user(id: string){
return this.http.get(`${this.API_URI}/actividades/usuario/${id}`);
}

//Actividades por hacer dado un cod_asignacion_auxiliar, todas las actividades de un curso-------
getActividades_curso(id: string){
return this.http.get(`${this.API_URI}/actividades/asignacion/aux/${id}`);
}

//obtengo solo una actividad dado un cod_actividad
getOne_actividad(id: string){
  return this.http.get(`${this.API_URI}/actividades/lista/actividad/usuario/${id}`);
  }


// creo una actividad ---------------------
saveActividad(actividad:Actividad){
return this.http.post(`${this.API_URI}/actividades`, actividad);

}
//creo una nota
saveNota(nota:Nota){
  return this.http.post(`${this.API_URI}/actividades/nota`, nota);
  
  }

//metodo de borrar------------
deleteActividad(id: string){
return this.http.delete(`${this.API_URI}/actividades/${id}`);
}
//metodo de actualizar 
updateActividad(id:string, updated: Actividad){
return this.http.put(`${this.API_URI}/actividades/${id}`, updated);

}

//metodo de actualizar 
updateEstado_Actividad(estado:string, id: string){
  return this.http.put(`${this.API_URI}/actividades/estado/${estado}/${id}`, id);
  
  }

//obtengo todas las actividades hijas dado una actividad Padre -------
getActividades_hijas(id: string){
  return this.http.get(`${this.API_URI}/actividades/lista/actividad/usuario/estudiante/${id}`);
  }
  
///Verifica si existe la nota para dicha actividad
existNota(usuario: string, actividad: string){
  return this.http.get(`${this.API_URI}/actividades/validar/v/v/v/v/${usuario}/${actividad}`);
  }
/// obtengo todas las notas de las actividades con un cod_usuario dado
getactividadesNotas(id: string){
  return this.http.get(`${this.API_URI}/actividades/validar/v/v/v/v/nota/nota/usuario/${id}`);
  }

}
