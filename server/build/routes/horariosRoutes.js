"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const horariosController_1 = require("../controllers/horariosController");
class HorariosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', horariosController_1.horariosController.list); /// obtendo todos 
        this.router.get('/:id', horariosController_1.horariosController.getOne); //obtengo solo uno
        this.router.post('/', horariosController_1.horariosController.create); // creo uno
        this.router.put('/:id', horariosController_1.horariosController.update); //actualizo
        this.router.delete('/:id', horariosController_1.horariosController.delete); // Elimino uno
    }
}
const horariosRoutes = new HorariosRoutes();
exports.default = horariosRoutes.router;
