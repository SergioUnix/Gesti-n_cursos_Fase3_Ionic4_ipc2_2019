import {Router} from 'express';
import {asig_auxiliarController} from '../controllers/asig_auxController';

 class Asig_auxRoutes{

    public router: Router= Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', asig_auxiliarController.list); /// obtendo todos 
        this.router.get('/:id', asig_auxiliarController.getOne);  //obtengo solo uno
        this.router.post('/', asig_auxiliarController.create);  // creo uno
        this.router.put('/:id', asig_auxiliarController.update);  //actualizo
        this.router.delete('/:id', asig_auxiliarController.delete);  // Elimino uno
        this.router.get('/una/sola/asig/:id', asig_auxiliarController.getAsignacion); /// obtendo todos 
        
        this.router.get('/ultima/:id', asig_auxiliarController.ultimoRegistro); /// obtendo todos 
        this.router.post('/foro_despues_asig/foro', asig_auxiliarController.createForo);  // creo Foro una vez realizada la asignacion_auxiliar
        this.router.post('/motivo/asig/delete', asig_auxiliarController.createMotivo);  // creo un motivo para desasignacion

        this.router.delete('/foro/:id', asig_auxiliarController.deleteForo);  // Elimino uno

    }
}

const asig_auxRoutes =new Asig_auxRoutes();
export default asig_auxRoutes.router; 