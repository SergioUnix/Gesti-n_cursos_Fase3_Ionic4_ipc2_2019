"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const forosController_1 = require("../controllers/forosController");
class ForosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', forosController_1.forosController.list); /// obtendo todos 
        this.router.get('/:id', forosController_1.forosController.getOne); //obtengo solo uno
        this.router.post('/', forosController_1.forosController.create); // creo uno
        this.router.put('/:id', forosController_1.forosController.update); //actualizo
        this.router.delete('/:id', forosController_1.forosController.delete); // Elimino uno
        this.router.post('/padre', forosController_1.forosController.createPadre); // creo una publicación padre
        this.router.post('/hijo/pu', forosController_1.forosController.createHijo); // creo una publicación hijo
        this.router.get('/padres/padres/pa/:id', forosController_1.forosController.listPadres); /// obtengo todos las publicaciones tipo padre 
        this.router.get('/hijos/hijos/:id', forosController_1.forosController.listaHijos); //obtengo todos los hijos dato un ref_publi que es el codigo del padre
        this.router.put('/meGusta/:id', forosController_1.forosController.meGusta); //actualizo
    }
}
const forosRoutes = new ForosRoutes();
exports.default = forosRoutes.router;
