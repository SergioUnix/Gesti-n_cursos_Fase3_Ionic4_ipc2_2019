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
  selector: 'app-curso',
  templateUrl: './curso.page.html',
  styleUrls: ['./curso.page.scss'],
})
export class CursoPage implements OnInit {
  error_messages ={

   'nombre':[
      {type: 'required', message: 'Nombre requerido'},
      {type: 'minlength', message: 'Nombre tamaño minimo de 3 caracteres'},
      {type: 'maxlength', message: ' Nombre no exceda los 45 caracteres'},
   ],
   'descripcion':[
    {type: 'required', message: 'Descripción requerido'},
    {type: 'minlength', message: 'Descripción tamaño minimo de 3 caracteres'},
    {type: 'maxlength', message: ' Descripción no exceda los 45 caracteres'},
  ],
  }


  
    private loginForm: FormGroup;
  
    constructor(private seccionService:SeccionService, private horariosService:HorariosService,
    private cursosService:CursosService,private usuariosService:UsuariosService,
    private router: Router,private formBuilder: FormBuilder,private toastCtrl: ToastController,) {
      
        this.loginForm =this.formBuilder.group({
        nombre: new FormControl('',Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(45),
        
        ])),
        descripcion: new FormControl('',Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(45),
        
        ])),

      })  
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
//obtengo arreglo de cursos para mostrar
this.getCursos();


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



  
///Valido si existe el nombre del curso con la misma sección

//asigno cursos
existeCursoIgual(){

  this.cursosService.exist(this.curso.nombre.toString(),this.curso.cod_seccion_fk.toString()).subscribe(  /// 
    res => {
    this.presentToast('Ya existe un curso con sección igual');
    },
    err => {

    this.saveCurso();
 



    }
    );


}




 //Guardar Curso
 saveCurso(){    
  delete this.curso.cod_curso;
  delete this.curso.estado;
  this.cursosService.saveCurso(this.curso)
  .subscribe(
    res=> { 
    this.presentToast('Curso guardado');
    this.getCursos();
    
    },
    err=>{ console.error(err);
    
    }
  ) 


    }




 //Eliminar curso
    deleteCurso(cod_curso){
      this.cursosService.deleteCurso(cod_curso).subscribe(  /// 
        res => {
          this.presentToast('Curso eliminado');
          this.getCursos(); 
          location.reload();
         },
        err => console.error(err)
      );
    }
    




 /// obtiene arreglo de horarios para  items de horarios

 getCursos(){
  this.cursosService.getCursos().subscribe(  /// 
    res => {
      this.cursos = res;    ///aca almaceno la respuesta que me devuelve, y luego utilizarlo en la lista
     },
    err => console.error(err)
  );
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
