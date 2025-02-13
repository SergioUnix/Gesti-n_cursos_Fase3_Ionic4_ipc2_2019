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
class SeccionesController {
    // Obtengo una lista de los productos disponibles
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const arreglo = yield pool.query("SELECT * FROM seccion");
            res.json(arreglo);
        });
    }
    //Obtengo solo uno
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const arreglo = yield pool.query('SELECT * FROM seccion where cod_seccion=?', [id]);
            if (arreglo.length > 0) {
                return res.json(arreglo[0]);
            }
            else {
                res.status(404).json({ text: 'El seccion no existe ' });
            }
        });
    }
    // Creo uno    
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query('INSERT INTO seccion set ?', [req.body]);
            res.json({ message: 'Horario Guardado' });
        });
    }
    // elimino
    delete(req, res) {
        const { id } = req.params;
        pool.query('Delete from seccion where cod_seccion=?', [id]);
        res.json({ messaage: 'El seccion fue eliminado' });
    }
    /// Actualizar 
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield pool.query('UPDATE seccion set ? WHERE  cod_seccion=?', [req.body, id]);
            res.json({ massage: 'La seccion se ha actualizado' });
        });
    }
}
exports.seccionesController = new SeccionesController();
