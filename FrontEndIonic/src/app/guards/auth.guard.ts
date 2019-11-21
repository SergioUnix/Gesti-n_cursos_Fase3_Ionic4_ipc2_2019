import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import {UsuariosService} from '../servicios/usuarios.service'; ///importo el servicio

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private router:Router,private usuariosService:UsuariosService) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
  
      if(this.usuariosService.getSesionNombre()==''){
       console.log('Usuario no logueado');
       this.router.navigate(['/logueo']);
       return false;
     }else{
       console.log(this.usuariosService.getSesionCod());
       console.log(this.usuariosService.getSesionNombre());
       
       
       return true;
       
      }
  
    
    
   
    
  }

  
}
