"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const evaluacionesController_1 = require("../controllers/evaluacionesController");
class EvaluacionesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', evaluacionesController_1.evaluacionesController.list); /// obtendo todos 
        this.router.get('/:id', evaluacionesController_1.evaluacionesController.getOne); //obtengo solo uno
        this.router.post('/', evaluacionesController_1.evaluacionesController.create); // creo uno
        this.router.put('/:id', evaluacionesController_1.evaluacionesController.update); //actualizo
        this.router.delete('/:id', evaluacionesController_1.evaluacionesController.delete); // Elimino uno
        this.router.get('/asig/:id', evaluacionesController_1.evaluacionesController.getAsig); //obtengo las asignaciones que se han hecho a un auxiliar
        this.router.get('/eva/tipo1/:cod', evaluacionesController_1.evaluacionesController.getEva_tipo1); //obtengo las asignaciones que se han hecho a un auxiliar
        this.router.get('/eva/tipo2/aux/:cod', evaluacionesController_1.evaluacionesController.getEva_tipo2); //obtengo las asignaciones que se han hecho a un auxiliar
        this.router.get('/eva/tipo1/curso/c/c/c/:cod', evaluacionesController_1.evaluacionesController.getEva_tipo1_curso); //obtengo las asignaciones que se han hecho a un auxiliar
        this.router.get('/eva/tipo2/curso/c/c/c/c/:cod', evaluacionesController_1.evaluacionesController.getEva_tipo2_curso); //obtengo las asignaciones que se han hecho a un auxiliar
        this.router.get('/eva/tipo2/curso/c/c/c/c/o/:cod', evaluacionesController_1.evaluacionesController.getEva_tipo_orde); //obtengo las asignaciones que se han hecho a un auxiliar
        this.router.get('/eva/tipo2/curso/c/c/c/c/o/o/:cod', evaluacionesController_1.evaluacionesController.getEva_tipo_mat); //obtengo las asignaciones que se han hecho a un auxiliar
        this.router.put('/estado/:id', evaluacionesController_1.evaluacionesController.updateEstado);
        this.router.put('/estado/orden/:id', evaluacionesController_1.evaluacionesController.updateOrden);
        this.router.post('/preguntas', evaluacionesController_1.evaluacionesController.createPreguntas); // creo uno
        this.router.get('/preguntas/m/m/m/:id', evaluacionesController_1.evaluacionesController.getMultiples);
        this.router.get('/preguntas/v/f/v/f/:id', evaluacionesController_1.evaluacionesController.getVerdadero);
    }
}
const evaluacionesRoutes = new EvaluacionesRoutes();
exports.default = evaluacionesRoutes.router;
