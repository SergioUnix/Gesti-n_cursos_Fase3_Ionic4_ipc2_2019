"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asig_estuController_1 = require("../controllers/asig_estuController");
class Asig_estuRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', asig_estuController_1.asig_estudianteController.list); /// obtendo todos 
        this.router.get('/:id', asig_estuController_1.asig_estudianteController.getOne); //obtengo solo uno
        this.router.post('/', asig_estuController_1.asig_estudianteController.create); // creo uno
        this.router.put('/:id', asig_estuController_1.asig_estudianteController.update); //actualizo
        this.router.delete('/:id', asig_estuController_1.asig_estudianteController.delete); // Elimino uno
        this.router.get('/existe/:asig/:id', asig_estuController_1.asig_estudianteController.exist); ///me dice si el estudiante ya se ha asignado un curso o No
        //////obtengo todos los cursos asignados al estudiante
        this.router.get('/usuario/:id', asig_estuController_1.asig_estudianteController.listCursos); /// obtendo todos cursos asignados dado un usuario
        this.router.get('/usuarios/de/un/curso/:id', asig_estuController_1.asig_estudianteController.listUsuariosCurso); /// obtendo todos cursos asignados dado un usuario
        this.router.post('/asistencia/', asig_estuController_1.asig_estudianteController.createAsistencia); // creo una Asistencia
    }
}
const asig_estuRoutes = new Asig_estuRoutes();
exports.default = asig_estuRoutes.router;
