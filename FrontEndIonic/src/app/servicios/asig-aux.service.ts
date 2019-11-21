import { Injectable, HostBinding } from '@angular/core';
import {Asig_Aux } from 'src/app/modelos/Asig_Aux';   //importo el tipo de dato,
import {Foro } from 'src/app/modelos/Foro';   //importo el tipo de dato,
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Motivo } from 'src/app/modelos/Motivo'; 

@Injectable({
  providedIn: 'root'
})
export class AsigAuxService {
  // Creo una variable con mi dirección
  API_URI = 'http://localhost:3000/api';


constructor(private router:Router, private http:HttpClient) { }



//metodo para pedir 
getAsig_auxiliares(){
return this.http.get(`${this.API_URI}/asig_auxiliar`);
}
//metodo para obtener 
getAsig_aux(id: string){
return this.http.get(`${this.API_URI}/asig_auxiliar/${id}`);
}

getAsignacion(id: string){
  return this.http.get(`${this.API_URI}/asig_auxiliar/una/sola/asig/${id}`);
  }

//metodo para guardar 
saveAsig_aux(curso:Asig_Aux){
return this.http.post(`${this.API_URI}/asig_auxiliar`, curso);

}
//metodo de borrar
deleteAsig_aux(id: string){
return this.http.delete(`${this.API_URI}/asig_auxiliar/${id}`);
}
//metodo de actualizar 
updateAsig_aux(id:string, updated:Asig_Aux){
return this.http.put(`${this.API_URI}/asig_auxiliar/${id}`, updated);

}


  //metodo para obtener la ultima factura creada por el usuario utilizando el cod_usuario_fk
  getUltimaAsignacion(id: string){
    return this.http.get(`${this.API_URI}/asig_auxiliar/ultima/${id}`);
  
  }

  //metodo para guardar 
createForoAsig(foro:Foro){
  return this.http.post(`${this.API_URI}/asig_auxiliar/foro_despues_asig/foro`, foro);
  
  }
// guarda motivo para desasignar a un auxiliar
  saveMotivo(motivo:Motivo){
    return this.http.post(`${this.API_URI}/asig_auxiliar/motivo/asig/delete`, motivo);
    
    }

//metodo de borrar Foro
deleteForo(id: string){
  return this.http.delete(`${this.API_URI}/asig_auxiliar/foro/${id}`);
  }



}
