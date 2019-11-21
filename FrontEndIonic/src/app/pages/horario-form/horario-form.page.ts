import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import {HorariosService} from '../../servicios/horarios.service'; ///importo el servicio
import { Router, ActivatedRoute } from '@angular/router';
import { Horario} from 'src/app/modelos/Horario';
import { FormGroup, FormBuilder,FormControl, Validators, NgForm } from '@angular/forms';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-horario-form',
  templateUrl: './horario-form.page.html',
  styleUrls: ['./horario-form.page.scss'],
})
export class HorarioFormPage implements OnInit {



  
    private loginForm: FormGroup;
  
    constructor(private horariosService:HorariosService,private usuariosService:UsuariosService, private router: Router,private formBuilder: FormBuilder) {
      
     }
 horarios: any=[];

    horario: Horario = {
      cod_horario: 0,
      hora_inicio: '',
      hora_final: '',
  }

     
    public fecha_inicio='';
    public fecha_final=''; 
  public ExpectedEndDate='';

  
  ngOnInit() {
   //Obtengo todos los horarios
   this.getHorarios();
  


  }



  
  eventoHora(event){
    const texto = event.target.value;
    const fecha=formatDate(texto,'HH:mm:ss', 'en-Us', '-06');
    this.horario.hora_inicio =fecha;
   console.log(fecha);
     }
  eventoHora2(event){
    const texto = event.target.value;
    const fecha=formatDate(texto,'HH:mm:ss', 'en-Us', '-06');
    this.horario.hora_final =fecha;
   console.log(fecha);
     }



/////guardo 
saveHorario(){
  delete this.horario.cod_horario;

  this.horariosService.saveHorario(this.horario)
  .subscribe(
    res=> {
      console.log(res);
      this.getHorarios();
    },
    err=> console.error(err)

  ) 
}




  
  
   ///Metodo para eliminar
   deleteHorario(id: string){
    this.horariosService.deleteHorario(id).subscribe(  /// 
      res => {    
      this.getHorarios();     //pido el meodo de pintar los juegos para que se vea el cambio a la hora de eliminar uno y desaparezca
      location.reload();
      },
      err => console.error(err) );}
    
      
      
      
    //obtengo los horarios guardados
    getHorarios(){
    this.horariosService.getHorarios().subscribe(  /// 
      res => {
      this.horarios= res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
      },
      err => console.error(err)
      );}
      


  


}
