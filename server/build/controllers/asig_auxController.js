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
class Asig_auxiliarController {
    // Obtengo una lista -------------
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const arreglo = yield pool.query("SELECT cod_asignacion_auxiliar, semestre, año as anio, fecha_limite, cod_usuario_fk, cod_curso_fk, usuario.nombre as auxiliar,curso.nombre as curso, seccion.nombre as seccion, horario.hora_inicio, horario.hora_final FROM asignacion_auxiliar INNER JOIN usuario ON cod_usuario_fk =cod_usuario inner join curso on cod_curso=cod_curso_fk inner Join seccion ON cod_seccion=cod_seccion_fk    inner join horario On cod_horario = cod_horario_fk;");
            res.json(arreglo);
        });
    }
    //Obtengo lista de cursos a los que esta asignado un usuario ------------
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const arreglo = yield pool.query('SELECT cod_asignacion_auxiliar, semestre, año as anio, fecha_limite, cod_usuario_fk, cod_curso_fk, usuario.nombre as auxiliar,curso.nombre as curso, seccion.nombre as seccion, horario.hora_inicio, horario.hora_final FROM asignacion_auxiliar INNER JOIN usuario ON cod_usuario_fk =cod_usuario inner join curso on cod_curso=cod_curso_fk inner Join seccion ON cod_seccion=cod_seccion_fk    inner join horario On cod_horario = cod_horario_fk where cod_usuario_fk=?', [id]);
            if (arreglo.length > 0) {
                return res.json(arreglo);
            }
            else {
                res.status(404).json({ text: 'La asignacion_auxiliar no existe ' });
            }
        });
    }
    ///obtengo los datos de una sola asignación
    getAsignacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const arreglo = yield pool.query('SELECT * FROM proyecto_ionic.asignacion_auxiliar where cod_asignacion_auxiliar=?', [id]);
            if (arreglo.length > 0) {
                return res.json(arreglo[0]);
            }
            else {
                res.status(404).json({ text: 'La asignacion_auxiliar no existe ' });
            }
        });
    }
    // Creo uno    
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query('INSERT INTO asignacion_auxiliar set ?', [req.body]);
            res.json({ message: 'Asignacion_auxiliar Guardado' });
        });
    }
    // elimino
    delete(req, res) {
        const { id } = req.params;
        pool.query('Delete from asignacion_auxiliar where cod_asignacion_auxiliar=?', [id]);
        res.json({ messaage: 'La asignacion_auxiliar fue eliminada' });
    }
    /// Actualizar 
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield pool.query('UPDATE asignacion_auxiliar set ? WHERE  cod_asignacion_auxiliar=?', [req.body, id]);
            res.json({ massage: 'Asignacion_auxiliar se ha actualizado' });
        });
    }
    // Devuelvo el codigo de la ultima asignación_estudiante creada dado el codigo cod_usuario_fk
    ultimoRegistro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const ultimoregistro = yield pool.query('select cod_asignacion_auxiliar from asignacion_auxiliar  where cod_usuario_fk=? order by cod_asignacion_auxiliar desc limit 1', [id]);
            res.json(ultimoregistro[0]);
        });
    }
    // Creo Foro despues de haber asignado al auxiliar al curso   
    createForo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query('INSERT INTO foro set ?', [req.body]);
            res.json({ message: 'Foro creado automaticamente' });
        });
    }
    deleteForo(req, res) {
        const { id } = req.params;
        pool.query('Delete from foro where cod_asignacion_auxiliar_fk=?', [id]);
        res.json({ messaage: 'Foro eliminado' });
    }
    // Creo un motivo para la desasignacion de un auxiliar    
    createMotivo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query('INSERT INTO desasignacion set ?', [req.body]);
            res.json({ message: 'Auxiliar Desasignado' });
        });
    }
}
exports.asig_auxiliarController = new Asig_auxiliarController();
