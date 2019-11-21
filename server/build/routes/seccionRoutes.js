"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seccionController_1 = require("../controllers/seccionController");
class SeccionRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', seccionController_1.seccionesController.list); /// obtendo todos 
        this.router.get('/:id', seccionController_1.seccionesController.getOne); //obtengo solo uno
        this.router.post('/', seccionController_1.seccionesController.create); // creo uno
        this.router.put('/:id', seccionController_1.seccionesController.update); //actualizo
        this.router.delete('/:id', seccionController_1.seccionesController.delete); // Elimino uno
    }
}
const seccionRoutes = new SeccionRoutes();
exports.default = seccionRoutes.router;
