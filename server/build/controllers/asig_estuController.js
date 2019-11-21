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
class Asig_estudianteController {
    // Obtengo una lista de los productos disponibles
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const arreglo = yield pool.query("SELECT * FROM asignacion_estudiante");
            res.json(arreglo);
        });
    }
    //Obtengo solo uno
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const arreglo = yield pool.query('SELECT * FROM asignacion_estudiante where cod_asignacion_estudiante=?', [id]);
            if (arreglo.length > 0) {
                return res.json(arreglo[0]);
            }
            else {
                res.status(404).json({ text: 'la asignacion no existe ' });
            }
        });
    }
    // Creo uno    --------------
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query('INSERT INTO asignacion_estudiante set ?', [req.body]);
            res.json({ message: 'Guardado' });
        });
    }
    // elimino -----------------
    delete(req, res) {
        const { id } = req.params;
        pool.query('Delete from asignacion_estudiante where cod_asignacion_estudiante=?', [id]);
        res.json({ messaage: 'eliminado' });
    }
    /// Actualizar 
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield pool.query('UPDATE asignacion_estudiante set ? WHERE  cod_asignacion_estudiante=?', [req.body, id]);
            res.json({ massage: 'se ha sido actualizado' });
        });
    }
    ////existe asignacion para un usuario
    exist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //const {id}=req.params;
            const { asig } = req.params;
            const { id } = req.params;
            const usuarios = yield pool.query("SELECT * FROM proyecto_ionic.asignacion_estudiante where cod_usuario_fk=? and cod_asignacion_auxiliar_fk=?", [id, asig]);
            if (usuarios.length > 0) {
                return res.json(usuarios[0]);
            }
            else {
                res.status(404).json({ text: 'El usuario no encontrado' });
            }
        });
    }
    //Obtengo lista de cursos asignados de un estudiante
    listCursos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const arreglo = yield pool.query("SELECT cod_asignacion_estudiante, cod_asignacion_auxiliar,usuario.cod_usuario, usuario.nombre as estudiante, curso.nombre as curso, seccion.nombre as seccion FROM asignacion_estudiante INNER JOIN asignacion_auxiliar ON cod_asignacion_auxiliar =cod_asignacion_auxiliar_fk inner join usuario on usuario.cod_usuario=asignacion_estudiante.cod_usuario_fk inner Join curso ON curso.cod_curso=asignacion_auxiliar.cod_curso_fk inner join seccion On seccion.cod_seccion = curso.cod_seccion_fk where usuario.cod_usuario=?", [id]);
            if (arreglo.length > 0) {
                return res.json(arreglo);
            }
            else {
                res.status(404).json({ text: 'la asignacion no existe ' });
            }
        });
    }
    //Obtengo lista de cursos asignados de un estudiante------------
    listUsuariosCurso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const arreglo = yield pool.query("SELECT cod_asignacion_auxiliar, cod_asignacion_estudiante, cod_usuario, usuario.nombre, usuario.correo, usuario.carne FROM proyecto_ionic.asignacion_estudiante Inner join asignacion_auxiliar on cod_asignacion_auxiliar=asignacion_estudiante.cod_asignacion_auxiliar_fk Inner join usuario on cod_usuario=asignacion_estudiante.cod_usuario_fk where asignacion_auxiliar.cod_asignacion_auxiliar=?", [id]);
            if (arreglo.length > 0) {
                return res.json(arreglo);
            }
            else {
                res.status(404).json({ text: 'la asignacion no existe ' });
            }
        });
    }
    // Crear una asistencia    --------------
    createAsistencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query('INSERT INTO asistencia set ?', [req.body]);
            res.json({ message: 'Asistencia Guardada' });
        });
    }
}
exports.asig_estudianteController = new Asig_estudianteController();
