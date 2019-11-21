import {Router} from 'express';
import {horariosController} from '../controllers/horariosController';

 class HorariosRoutes{

    public router: Router= Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', horariosController.list); /// obtendo todos 
        this.router.get('/:id', horariosController.getOne);  //obtengo solo uno
        this.router.post('/', horariosController.create);  // creo uno
        this.router.put('/:id', horariosController.update);  //actualizo
        this.router.delete('/:id', horariosController.delete);  // Elimino uno
        
        
    }
}

const horariosRoutes =new HorariosRoutes();
export default horariosRoutes.router; 