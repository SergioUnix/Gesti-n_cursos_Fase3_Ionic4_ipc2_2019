import {Router} from 'express';
import {seccionesController} from '../controllers/seccionController';

 class SeccionRoutes{

    public router: Router= Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', seccionesController.list); /// obtendo todos 
        this.router.get('/:id', seccionesController.getOne);  //obtengo solo uno
        this.router.post('/', seccionesController.create);  // creo uno
        this.router.put('/:id', seccionesController.update);  //actualizo
        this.router.delete('/:id', seccionesController.delete);  // Elimino uno
        
        
    }
}

const seccionRoutes =new SeccionRoutes();
export default seccionRoutes.router; 