import {Router} from 'express';
import {actividadesController} from '../controllers/actividadesController';

 class ActividadesRoutes{

    public router: Router= Router();

    constructor(){
        this.config();
    } 

    config(): void {
        this.router.get('/', actividadesController.list); /// obtendo 
        this.router.get('/usuario/:id', actividadesController.getList_user);  //obtengo todas las actividades de un usuario -------
        this.router.get('/asignacion/aux/:id', actividadesController.getActividades_curso);  //obtengo todas las actividades de un curso -------
        this.router.get('/lista/actividad/usuario/:id', actividadesController.getOne);  //obtengo solo una actividad dado un cod_actividad -------
        this.router.get('/lista/actividad/usuario/estudiante/:id', actividadesController.getActividades_hijas);  //obtengo solo las actividades hijas de Una Actividad padre -------
        this.router.get('/validar/v/v/v/v/:usuario/:actividad', actividadesController.existNota);  //existe ya la nota creada para esta actividad?
        this.router.get('/validar/v/v/v/v/nota/nota/usuario/:id', actividadesController.actividadesNotas);  //existe ya la nota creada para esta actividad?
        this.router.get('/lista/acti/vida/de/estudiantes/en/curso/ocho/nueve/:id', actividadesController.actividadesAcalificar);  //todas actividades de los estudiantes en un curso, se obtiene dado la actividad padre
       


        this.router.post('/', actividadesController.create);  // creo una actividad -----------
        this.router.post('/nota', actividadesController.createNota);  // creo una actividad -----------
        this.router.put('/:id', actividadesController.update);  //actualizo
        this.router.delete('/:id', actividadesController.delete);  // Elimino uno
        
 
        this.router.put('/estado/:estado/:id', actividadesController.updateEstado);  //actualizo
        
    }
}

const actividadesRoutes =new ActividadesRoutes();
export default actividadesRoutes.router; 