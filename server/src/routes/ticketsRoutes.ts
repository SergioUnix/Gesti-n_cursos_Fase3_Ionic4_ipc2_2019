import {Router} from 'express';
import {ticketsController} from '../controllers/ticketsController';

 class TicketsRoutes{

    public router: Router= Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', ticketsController.list); /// obtendo todos los tickets----------- 
        this.router.get('/:id', ticketsController.getOne);  //obtengo todos los tickets dado un cod_usuario -------
        this.router.post('/', ticketsController.create);  // creo uno
        this.router.put('/:id', ticketsController.update);  //actualizo
        this.router.delete('/:id', ticketsController.delete);  // Elimino uno
        

        this.router.put('/estado/:estado/:id', ticketsController.updateEstado);  //actualizo
        
    }
}

const ticketsRoutes =new TicketsRoutes();
export default ticketsRoutes.router; 