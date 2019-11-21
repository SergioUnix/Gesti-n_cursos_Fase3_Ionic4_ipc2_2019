"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pool = require('../database');
class ForosController {
    // Obtengo una lista cursos registrados
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const arreglo = yield pool.query("Select * From foro");
            res.json(arreglo);
        });
    }
    //Obtengo un solo foro con el codigo de asignacion_auxiliar
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const arreglo = yield pool.query('SELECT * FROM foro where cod_asignacion_auxiliar_fk=?', [id]);
            if (arreglo.length > 0) {
                return res.json(arreglo);
            }
            else {
                res.status(404).json({ text: 'El foro no existe ' });
            }
        });
    }
    // Creo uno    
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query('INSERT INTO foro set ?', [req.body]);
            res.json({ message: 'Foro guardado Guardado' });
        });
    }
    // elimino
    delete(req, res) {
        const { id } = req.params;
        pool.query('Delete from foro where cod_foro=?', [id]);
        res.json({ messaage: 'El foro fue eliminado' });
    }
    /// Actualizar 
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield pool.query('UPDATE foro set ? WHERE  cod_asignacion_auxiliar_fk=?', [req.body, id]);
            res.json({ massage: 'El foro se ha sido actualizado' });
        });
    }
    // Obtengo las publicaciones tipo padre 
    listPadres(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const arreglo = yield pool.query("Select cod_publicacion, comentario, ref_publi, creador_pu_usuario, cod_foro_fk, usuario.nombre, usuario.cod_usuario, rol.nombre as rol, me_gusta  from publicacion inner join usuario on creador_pu_usuario = usuario.cod_usuario inner join rol on rol.cod_rol=usuario.cod_rol_fk where publicacion.ref_publi is null and cod_foro_fk=? order by cod_publicacion desc", [id]);
            res.json(arreglo);
        });
    }
    //Obtengo la lista de hijos de un solo padre dado el ref_publi que es el codigo del padre
    listaHijos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const arreglo = yield pool.query('Select cod_publicacion, comentario, ref_publi, creador_pu_usuario, cod_foro_fk, usuario.nombre, usuario.cod_usuario , rol.nombre as rol, me_gusta  from publicacion inner join usuario on creador_pu_usuario = usuario.cod_usuario inner join rol on usuario.cod_rol_fk = rol.cod_rol where publicacion.ref_publi is not null and ref_publi=? order by cod_publicacion desc', [id]);
            if (arreglo.length > 0) {
                return res.json(arreglo);
            }
            else {
                res.status(404).json({ text: 'No existen hijos para tal padre ' });
            }
        });
    }
    // Creo uno    
    createPadre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query('INSERT INTO publicacion set ?', [req.body]);
            res.json({ message: 'publicacion padre guardada' });
        });
    }
    // Creo uno    
    createHijo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query('INSERT INTO publicacion set ?', [req.body]);
            res.json({ message: 'publicacion hijo guardada' });
        });
    }
    ///Actualizo un me gusta
    meGusta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield pool.query('UPDATE publicacion set ? WHERE  cod_publicacion=?', [req.body, id]);
            res.json({ massage: 'Me gusta Actualizado' });
        });
    }
}
exports.forosController = new ForosController();
