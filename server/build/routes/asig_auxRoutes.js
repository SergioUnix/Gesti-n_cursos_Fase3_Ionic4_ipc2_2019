"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asig_auxController_1 = require("../controllers/asig_auxController");
class Asig_auxRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', asig_auxController_1.asig_auxiliarController.list); /// obtendo todos 
        this.router.get('/:id', asig_auxController_1.asig_auxiliarController.getOne); //obtengo solo uno
        this.router.post('/', asig_auxController_1.asig_auxiliarController.create); // creo uno
        this.router.put('/:id', asig_auxController_1.asig_auxiliarController.update); //actualizo
        this.router.delete('/:id', asig_auxController_1.asig_auxiliarController.delete); // Elimino uno
        this.router.get('/una/sola/asig/:id', asig_auxController_1.asig_auxiliarController.getAsignacion); /// obtendo todos 
        this.router.get('/ultima/:id', asig_auxController_1.asig_auxiliarController.ultimoRegistro); /// obtendo todos 
        this.router.post('/foro_despues_asig/foro', asig_auxController_1.asig_auxiliarController.createForo); // creo Foro una vez realizada la asignacion_auxiliar
        this.router.post('/motivo/asig/delete', asig_auxController_1.asig_auxiliarController.createMotivo); // creo un motivo para desasignacion
        this.router.delete('/foro/:id', asig_auxController_1.asig_auxiliarController.deleteForo); // Elimino uno
    }
}
const asig_auxRoutes = new Asig_auxRoutes();
exports.default = asig_auxRoutes.router;
