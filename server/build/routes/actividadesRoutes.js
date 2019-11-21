"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const actividadesController_1 = require("../controllers/actividadesController");
class ActividadesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', actividadesController_1.actividadesController.list); /// obtendo 
        this.router.get('/usuario/:id', actividadesController_1.actividadesController.getList_user); //obtengo todas las actividades de un usuario -------
        this.router.get('/asignacion/aux/:id', actividadesController_1.actividadesController.getActividades_curso); //obtengo todas las actividades de un curso -------
        this.router.get('/lista/actividad/usuario/:id', actividadesController_1.actividadesController.getOne); //obtengo solo una actividad dado un cod_actividad -------
        this.router.get('/lista/actividad/usuario/estudiante/:id', actividadesController_1.actividadesController.getActividades_hijas); //obtengo solo las actividades hijas de Una Actividad padre -------
        this.router.get('/validar/v/v/v/v/:usuario/:actividad', actividadesController_1.actividadesController.existNota); //existe ya la nota creada para esta actividad?
        this.router.get('/validar/v/v/v/v/nota/nota/usuario/:id', actividadesController_1.actividadesController.actividadesNotas); //existe ya la nota creada para esta actividad?
        this.router.get('/lista/acti/vida/de/estudiantes/en/curso/ocho/nueve/:id', actividadesController_1.actividadesController.actividadesAcalificar); //todas actividades de los estudiantes en un curso, se obtiene dado la actividad padre
        this.router.post('/', actividadesController_1.actividadesController.create); // creo una actividad -----------
        this.router.post('/nota', actividadesController_1.actividadesController.createNota); // creo una actividad -----------
        this.router.put('/:id', actividadesController_1.actividadesController.update); //actualizo
        this.router.delete('/:id', actividadesController_1.actividadesController.delete); // Elimino uno
        this.router.put('/estado/:estado/:id', actividadesController_1.actividadesController.updateEstado); //actualizo
    }
}
const actividadesRoutes = new ActividadesRoutes();
exports.default = actividadesRoutes.router;
