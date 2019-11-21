import { Injectable } from '@angular/core';
import { Foro } from 'src/app/modelos/Foro';   //importo el tipo de dato,
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Evaluacion } from 'src/app/modelos/Evaluacion';   //importo el tipo de dato,
import { Pregunta } from 'src/app/modelos/Pregunta';  
@Injectable({
  providedIn: 'root'
})
export class EvaluacionesService {
  API_URI = 'http://localhost:3000/api';


constructor(private router:Router, private http:HttpClient) { }



//metodo para pedir 
getEvaluaciones(){
return this.http.get(`${this.API_URI}/evaluaciones`);
}



//metodo para obtener 
getEvaluacion(id: string){
return this.http.get(`${this.API_URI}/evaluaciones/${id}`);
}

//metodo para guardar 
saveEvaluacion(foro:Foro){
return this.http.post(`${this.API_URI}/evaluaciones`, foro);

}
//metodo de borrar
deleteEvaluacion(id: string){
return this.http.delete(`${this.API_URI}/evaluaciones/${id}`);
}
//metodo de actualizar 
updateEvaluacion(id:string, updated:Evaluacion){
return this.http.put(`${this.API_URI}/evaluaciones/${id}`, updated);

}

//metodo para obtener todas las a signaciones de un auxiliar-- utilizo para obtener cursos-- doy el cod_Usuario auxiliar 
getAsig_cursos(id: string){
  return this.http.get(`${this.API_URI}/evaluaciones/asig/${id}`);
  }

//metodo para obtener todas las evaluaciones creadas por el usuario auxiliar tipo Verdadero/Falso
getEva_tipo1(id: string){
  return this.http.get(`${this.API_URI}/evaluaciones/eva/tipo1/${id}`);
  }
//metodo para obtener todas las evaluaciones creadas por el usuario auxiliar tipo 'Selección Múltiple'
getEva_tipo2(id: string){
  return this.http.get(`${this.API_URI}/evaluaciones/eva/tipo2/aux/${id}`);
  }
 
  //metodo para obtener todas las evaluaciones creadas por un curso tipo Verdadero/Falso
getEva_tipo1_curso(id: string){
  return this.http.get(`${this.API_URI}/evaluaciones/eva/tipo1/curso/c/c/c/${id}`);
  }
//metodo para obtener todas las evaluaciones creadas dado un cod_asignacion_auxiliar , tipo 'Selección Múltiple'
getEva_tipo2_curso(id: string){
  return this.http.get(`${this.API_URI}/evaluaciones/eva/tipo2/curso/c/c/c/c/${id}`);
  }
 
  //metodo para obtener todas las evaluaciones creadas por un curso tipo Verdadero/Falso
  getEva_tipo_orde(id: string){
    return this.http.get(`${this.API_URI}/evaluaciones/eva/tipo2/curso/c/c/c/c/o/${id}`);
    }
  //metodo para obtener todas las evaluaciones creadas dado un cod_asignacion_auxiliar , tipo 'Selección Múltiple'
  getEva_tipo_mat(id: string){
    return this.http.get(`${this.API_URI}/evaluaciones/eva/tipo2/curso/c/c/c/c/o/o/${id}`);
    }







/// Metodo que habilita la evaluacion
updateEstado(id:string, u:string){
  return this.http.put(`${this.API_URI}/evaluaciones/estado/${id}`, u);
  
  }

/// Metodo que habilita la evaluacion
updateOrden(id:string, u:string){
  return this.http.put(`${this.API_URI}/evaluaciones/estado/orden/${id}`, u);
  
  }

//metodo para guardar 
savePregunta(pregunta:Pregunta){
  return this.http.post(`${this.API_URI}/evaluaciones/preguntas`, pregunta);
}


getPreguntas(id: string){
  return this.http.get(`${this.API_URI}/evaluaciones/preguntas/m/m/m/${id}`);
  }
 

}
