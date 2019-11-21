import {Router} from 'express';
import {asig_estudianteController} from '../controllers/asig_estuController';

 class Asig_estuRoutes{

    public router: Router= Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', asig_estudianteController.list); /// obtendo todos 
        this.router.get('/:id', asig_estudianteController.getOne);  //obtengo solo uno
        this.router.post('/', asig_estudianteController.create);  // creo uno
        this.router.put('/:id', asig_estudianteController.update);  //actualizo
        this.router.delete('/:id', asig_estudianteController.delete);  // Elimino uno
        
        this.router.get('/existe/:asig/:id', asig_estudianteController.exist); ///me dice si el estudiante ya se ha asignado un curso o No

        //////obtengo todos los cursos asignados al estudiante
        this.router.get('/usuario/:id', asig_estudianteController.listCursos); /// obtendo todos cursos asignados dado un usuario


        this.router.get('/usuarios/de/un/curso/:id', asig_estudianteController.listUsuariosCurso); /// obtendo todos cursos asignados dado un usuario
        this.router.post('/asistencia/', asig_estudianteController.createAsistencia);  // creo una Asistencia



    }
}

const asig_estuRoutes =new Asig_estuRoutes();
export default asig_estuRoutes.router; 