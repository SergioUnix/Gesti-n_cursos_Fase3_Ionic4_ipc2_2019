import {Router} from 'express';
import {evaluacionesController} from '../controllers/evaluacionesController';

 class EvaluacionesRoutes{

    public router: Router= Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', evaluacionesController.list); /// obtendo todos 
        this.router.get('/:id', evaluacionesController.getOne);  //obtengo solo uno
        this.router.post('/', evaluacionesController.create);  // creo uno
        this.router.put('/:id', evaluacionesController.update);  //actualizo
        this.router.delete('/:id', evaluacionesController.delete);  // Elimino uno

        this.router.get('/asig/:id', evaluacionesController.getAsig);  //obtengo las asignaciones que se han hecho a un auxiliar
        this.router.get('/eva/tipo1/:cod', evaluacionesController.getEva_tipo1);  //obtengo las asignaciones que se han hecho a un auxiliar
        this.router.get('/eva/tipo2/aux/:cod', evaluacionesController.getEva_tipo2);  //obtengo las asignaciones que se han hecho a un auxiliar
        this.router.get('/eva/tipo1/curso/c/c/c/:cod', evaluacionesController.getEva_tipo1_curso);  //obtengo las asignaciones que se han hecho a un auxiliar
        this.router.get('/eva/tipo2/curso/c/c/c/c/:cod', evaluacionesController.getEva_tipo2_curso);  //obtengo las asignaciones que se han hecho a un auxiliar
        this.router.get('/eva/tipo2/curso/c/c/c/c/o/:cod', evaluacionesController.getEva_tipo_orde);  //obtengo las asignaciones que se han hecho a un auxiliar
        this.router.get('/eva/tipo2/curso/c/c/c/c/o/o/:cod', evaluacionesController.getEva_tipo_mat);  //obtengo las asignaciones que se han hecho a un auxiliar
          
        
        this.router.put('/estado/:id', evaluacionesController.updateEstado);  
        this.router.put('/estado/orden/:id', evaluacionesController.updateOrden);

        this.router.post('/preguntas', evaluacionesController.createPreguntas);  // creo uno
        this.router.get('/preguntas/m/m/m/:id', evaluacionesController.getMultiples);
        this.router.get('/preguntas/v/f/v/f/:id', evaluacionesController.getVerdadero);


    }
}

const evaluacionesRoutes =new EvaluacionesRoutes();
export default evaluacionesRoutes.router; 