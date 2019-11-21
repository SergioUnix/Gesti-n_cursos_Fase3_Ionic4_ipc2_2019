import {Request, Response} from 'express';
const pool = require ('../database');

class TicketsController{
    
    // Obtengo una lista de tickets de cualquier usuario---------------
    public async list(req: Request, res: Response ){ 
    const productos =await pool.query("Select cod_ticket, asunto, cuerpo, cod_estado_fkt, cod_usuario_fkt, estado.nombre as estado , estado.cod_estado as cod_estado  ,usuario.nombre from ticket inner join estado on cod_estado_fkt = estado.cod_estado inner join usuario on usuario.cod_usuario = ticket.cod_usuario_fkt" );    res.json(productos);  
    }
    //Obtengo una lista de tickets de un solo usuario dado un cod_usuario -----------
    public async getOne(req: Request, res: Response ): Promise<any>{    
    const {id} =req.params;
    const arreglo = await pool.query('Select cod_ticket, asunto, cuerpo, cod_estado_fkt, cod_usuario_fkt, estado.nombre as estado , estado.cod_estado as cod_estado  ,usuario.nombre from ticket inner join estado on cod_estado_fkt = estado.cod_estado inner join usuario on usuario.cod_usuario = ticket.cod_usuario_fkt where cod_usuario_fkt=?', [id]);         
    if(arreglo.length>0){
        return res.json(arreglo);
    }else{
    res.status(404).json({text:'No hay tickets '});}  
    }

    // Creo uno ticket ----------------------   
    public async create(req: Request, res: Response ){
    await pool.query('INSERT INTO ticket set ?', [req.body]);
    res.json({message: 'Horario Guardado'});    
    }
    // elimino
    public delete(req: Request, res: Response ){
        const {id}= req.params;
        pool.query('Delete from ticket where cod_ticket=?',[id]);
        res.json({messaage: 'El ticket fue eliminado'});
        
    }

    /// Actualizar ticket dado el cod_tiket--------------------
    public async update(req: Request, res: Response ){
        const {id}=req.params;
        await pool.query('UPDATE ticket set ? WHERE  cod_ticket=?', [req.body,id]);
        res.json({massage: 'El horario se ha sido actualizado'});
    }
    
    
    // Funcion que cambia de estado el ticket
    public async updateEstado(req: Request, res: Response ){
        const {id}=req.params;
        const {estado}=req.params;
        await pool.query("UPDATE ticket set cod_estado_fkt=?  WHERE  cod_ticket=?", [estado,id]);
        res.json({massage: 'Estado Cambiado'});
    }


}

export const ticketsController = new TicketsController();