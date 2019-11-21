"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const converController_1 = require("../controllers/converController");
class ConversRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:nom/:id', converController_1.conversController.conver_un_usuario); //Obtengo usuarios a los que ha tenido mensajes el usuario logueado
        this.router.get('/1/:cod_r/:cod_d', converController_1.conversController.mensajes_dos_usuarios); //obtengo mensajes entre dos usuarios con estado 1 que es el Eviado
        this.router.get('/exist/correo/usuario/:correo', converController_1.conversController.existCorreo); /// Existen mensajes no visto por Mi?
        this.router.get('/exist/correo/usuario/:correo/:pass', converController_1.conversController.recuperar); /// recupera el usuario dado el correo y la contraseña temporal
        this.router.post('/', converController_1.conversController.createMensaje); // creo mensajes
        this.router.put('/:id', converController_1.conversController.updateEliminado); //actualizo
    }
}
const conversRoutes = new ConversRoutes();
exports.default = conversRoutes.router;
