import {Router} from 'express';
import {forosController} from '../controllers/forosController';

 class ForosRoutes{

    public router: Router= Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', forosController.list); /// obtendo todos 
        this.router.get('/:id', forosController.getOne);  //obtengo solo uno
        this.router.post('/', forosController.create);  // creo uno
        this.router.put('/:id', forosController.update);  //actualizo
        this.router.delete('/:id', forosController.delete);  // Elimino uno


        this.router.post('/padre', forosController.createPadre);  // creo una publicación padre
        this.router.post('/hijo/pu', forosController.createHijo);  // creo una publicación hijo
        this.router.get('/padres/padres/pa/:id', forosController.listPadres); /// obtengo todos las publicaciones tipo padre 
        this.router.get('/hijos/hijos/:id', forosController.listaHijos);  //obtengo todos los hijos dato un ref_publi que es el codigo del padre
        this.router.put('/meGusta/:id', forosController.meGusta);  //actualizo
        
    
    
    }
}

const forosRoutes =new ForosRoutes();
export default forosRoutes.router; 