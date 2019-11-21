import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  

  transform(conversaciones:any[],texto:String ): any[] {
  
  if(texto.length===0) { return conversaciones;}
  texto=texto.toLocaleLowerCase();  ///el texto ingresado lo paso a minusculas
  
  
  
  const result=conversaciones.filter((con) => {    //filter si recibe un true devuelve arreglo con los objetos
  //imprime los valores del arreglo en minusculas 
  console.log(con.nombre.toLocaleLowerCase());
  //imprime un true cuando encuentra conincidencia
  console.log(con.nombre.toLocaleLowerCase().includes(texto))
  return con.nombre.toLocaleLowerCase().includes(texto)  || con.carne.toString().toLocaleLowerCase().includes(texto) ;  //retorna un true al filter si detecta coincidencia
  });
  return result;
  
  }
  }