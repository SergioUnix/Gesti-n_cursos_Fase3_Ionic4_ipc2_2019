import {Router} from 'express';
import {conversController} from '../controllers/converController';
 class ConversRoutes{

    public router: Router= Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/:nom/:id', conversController.conver_un_usuario); //Obtengo usuarios a los que ha tenido mensajes el usuario logueado
        this.router.get('/1/:cod_r/:cod_d', conversController.mensajes_dos_usuarios); //obtengo mensajes entre dos usuarios con estado 1 que es el Eviado
        this.router.get('/exist/correo/usuario/:correo', conversController.existCorreo); /// Existen mensajes no visto por Mi?
        this.router.get('/exist/correo/usuario/:correo/:pass', conversController.recuperar); /// recupera el usuario dado el correo y la contraseña temporal


        this.router.post('/', conversController.createMensaje); // creo mensajes
        
        this.router.put('/:id', conversController.updateEliminado);  //actualizo



    }
}

const conversRoutes =new ConversRoutes();
export default conversRoutes.router; 