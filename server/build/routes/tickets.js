"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticketsController_1 = require("../controllers/ticketsController");
class TicketsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', ticketsController_1.ticketsController.list); /// obtendo todos los tickets----------- 
        this.router.get('/:id', ticketsController_1.ticketsController.getOne); //obtengo todos los tickets dado un cod_usuario -------
        this.router.post('/', ticketsController_1.ticketsController.create); // creo uno
        this.router.put('/:id', ticketsController_1.ticketsController.update); //actualizo
        this.router.delete('/:id', ticketsController_1.ticketsController.delete); // Elimino uno
    }
}
const ticketsRoutes = new TicketsRoutes();
exports.default = ticketsRoutes.router;
