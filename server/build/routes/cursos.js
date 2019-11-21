"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cursosController_1 = require("../controllers/cursosController");
class CursosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', cursosController_1.cursosController.list); /// obtendo todos 
        this.router.get('/:id', cursosController_1.cursosController.getOne); //obtengo solo uno
        this.router.post('/', cursosController_1.cursosController.create); // creo uno
        this.router.put('/:id', cursosController_1.cursosController.update); //actualizo
        this.router.delete('/:id', cursosController_1.cursosController.delete); // Elimino uno
        this.router.get('/disponibles/dis', cursosController_1.cursosController.listDisponibles); /// obtendo los Disponibles
        this.router.put('/Disponi/:id', cursosController_1.cursosController.updateDis); //actualizo
        this.router.put('/Ocupado/Ocu/:id', cursosController_1.cursosController.updateOcup); //actualizo
        this.router.get('/validar/:curso/:seccion', cursosController_1.cursosController.exist); //Existe Nombre de Curso y Seccion ya creados?
    }
}
const cursosRoutes = new CursosRoutes();
exports.default = cursosRoutes.router;
