import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'auxiliar'
})
export class AuxiliarPipe implements PipeTransform {

  

  transform(conversaciones:any[],texto:String ): any[] {
  
  if(texto.length===0) { return conversaciones;}
  texto=texto.toLocaleLowerCase();  ///el texto ingresado lo paso a minusculas
  
  
  
  const result=conversaciones.filter((con) => {    //filter si recibe un true devuelve arreglo con los objetos
  //imprime los valores del arreglo en minusculas 
  console.log(con.auxiliar.toLocaleLowerCase());
  //imprime un true cuando encuentra conincidencia
  console.log(con.curso.toLocaleLowerCase().includes(texto))
  return con.auxiliar.toLocaleLowerCase().includes(texto)  || con.curso.toLocaleLowerCase().includes(texto) ;  //retorna un true al filter si detecta coincidencia
  });
  return result;
  
  }
  }