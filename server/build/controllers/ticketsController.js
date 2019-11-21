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
class TicketsController {
    // Obtengo una lista de tickets de cualquier usuario---------------
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productos = yield pool.query("Select cod_ticket, asunto, cuerpo, cod_estado_fkt, cod_usuario_fkt, estado.nombre as estado , estado.cod_estado as cod_estado  ,usuario.nombre from ticket inner join estado on cod_estado_fkt = estado.cod_estado inner join usuario on usuario.cod_usuario = ticket.cod_usuario_fkt");
            res.json(productos);
        });
    }
    //Obtengo una lista de tickets de un solo usuario dado un cod_usuario -----------
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const arreglo = yield pool.query('Select cod_ticket, asunto, cuerpo, cod_estado_fkt, cod_usuario_fkt, estado.nombre as estado , estado.cod_estado as cod_estado  ,usuario.nombre from ticket inner join estado on cod_estado_fkt = estado.cod_estado inner join usuario on usuario.cod_usuario = ticket.cod_usuario_fkt where cod_usuario_fkt=?', [id]);
            if (arreglo.length > 0) {
                return res.json(arreglo);
            }
            else {
                res.status(404).json({ text: 'No hay tickets ' });
            }
        });
    }
    // Creo uno ticket ----------------------   
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query('INSERT INTO ticket set ?', [req.body]);
            res.json({ message: 'Horario Guardado' });
        });
    }
    // elimino
    delete(req, res) {
        const { id } = req.params;
        pool.query('Delete from ticket where cod_ticket=?', [id]);
        res.json({ messaage: 'El ticket fue eliminado' });
    }
    /// Actualizar ticket dado el cod_tiket--------------------
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield pool.query('UPDATE ticket set ? WHERE  cod_ticket=?', [req.body, id]);
            res.json({ massage: 'El horario se ha sido actualizado' });
        });
    }
    // Funcion que cambia de estado el ticket
    updateEstado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { estado } = req.params;
            yield pool.query("UPDATE ticket set cod_estado_fkt=?  WHERE  cod_ticket=?", [estado, id]);
            res.json({ massage: 'Estado Cambiado' });
        });
    }
}
exports.ticketsController = new TicketsController();
