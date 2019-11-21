import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../servicios/usuarios.service'; ///importo el servicio
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Curso} from 'src/app/modelos/Curso';
import { FormGroup, FormBuilder,FormControl, Validators, NgForm } from '@angular/forms';
import { SeccionService} from 'src/app/servicios/seccion.service';
import { HorariosService } from 'src/app/servicios/horarios.service';
import { CursosService } from 'src/app/servicios/cursos.service';

@Component({
  selector: 'app-curso-edit',
  templateUrl: './curso-edit.page.html',
  styleUrls: ['./curso-edit.page.scss'],
})
export class CursoEditPage implements OnInit {
  error_messages ={


  }


  
    private loginForm: FormGroup;
  
    constructor(private seccionService:SeccionService, private horariosService:HorariosService,
    private cursosService:CursosService,private usuariosService:UsuariosService,private activatedRoute:ActivatedRoute,
    private router: Router,private formBuilder: FormBuilder,private toastCtrl: ToastController,) {
      
 
     }

     horarios: any=[];
     secciones: any=[];
     cursos: any=[];
     
     
     curso:Curso={  
       cod_curso: 0,
       nombre: '',
       descripcion: '',
       estado: '',
       cod_horario_fk: 0,
       cod_seccion_fk: 0,
   }
   



  ngOnInit() {

//metodo para arreglo de horarios
this.getHorarios();
// metodo para arreglo de Secciones
this.getSecciones();




  const params =this.activatedRoute.snapshot.params;
  //console.log(params);
  if(params.id){        //este params.id me detecta el numero
    this.cursosService.getCurso(params.id)
      .subscribe(
         res =>{
           //console.log(res)
          this.curso=res; ///cuando accedo ala ruta game/edit/id ,, aca hago el objeto con el id recibido y eso me muestra en visualizacion

         },
         err => console.error(err)        )}




  }



  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    await toast.present();
  }




  eventoHorario(event){
    const texto = event.target.value;
    this.curso.cod_horario_fk = Number(texto);
  // console.log(texto);
     }
  eventoSeccion(event){
    const texto = event.target.value;
    this.curso.cod_seccion_fk = Number(texto);
 
   //console.log(texto);
     }




//Actualizo el curso
updateCurso(){
  const numero =this.curso.cod_curso;
  delete this.curso.cod_curso;
  delete this.curso.estado;


  //console.log(this.curso);
  this.cursosService.updateCurso(numero.toString(), this.curso)
    .subscribe(
    res =>{
      console.log(res);
   
      this.router.navigate(['/curso']);
    },
    err => {console.error(err);

    }

  )
}


    





 /// obtiene arreglo de horarios para  items de horarios

 getHorarios(){
  this.horariosService.getHorarios().subscribe(  /// 
    res => {
      this.horarios = res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
     },
    err => console.error(err)
  );
}

 /// Obtiene arreglo de secciones para items de seccion

 getSecciones(){
  this.seccionService.getSecciones().subscribe(  /// 
    res => {
      this.secciones = res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
     },
    err => console.error(err)
  );
}





}
