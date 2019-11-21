import {Request, Response} from 'express';
const pool = require ('../database');

class HorariosController{
    
    // Obtengo una lista de los productos disponibles
    public async list(req: Request, res: Response ){ 
    const productos =await pool.query("SELECT * FROM horario");
    res.json(productos);  
    }
    //Obtengo solo uno
    public async getOne(req: Request, res: Response ): Promise<any>{    
    const {id} =req.params;
    const arreglo = await pool.query('SELECT * FROM horario where cod_horario=?', [id]);     
    if(arreglo.length>0){
        return res.json(arreglo[0]);
    }else{
    res.status(404).json({text:'El horario no existe '});}  
    }

    // Creo uno    
    public async create(req: Request, res: Response ){
    await pool.query('INSERT INTO horario set ?', [req.body]);
    res.json({message: 'Horario Guardado'});    
    }
    // elimino
    public delete(req: Request, res: Response ){
        const {id}= req.params;
        pool.query('Delete from horario where cod_horario=?',[id]);
        res.json({messaage: 'El horario fue eliminado'});
        
    }

    /// Actualizar 
    public async update(req: Request, res: Response ){
        const {id}=req.params;
        await pool.query('UPDATE horario set ? WHERE  cod_horario=?', [req.body,id]);
        res.json({massage: 'El horario se ha sido actualizado'});
    }
    
    
 


}

export const horariosController = new HorariosController();