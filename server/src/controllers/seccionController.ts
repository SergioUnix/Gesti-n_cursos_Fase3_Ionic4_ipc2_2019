import {Request, Response} from 'express';
const pool = require ('../database');

class SeccionesController{
 
    
    // Obtengo una lista de los productos disponibles
    public async list(req: Request, res: Response ){ 
        const arreglo =await pool.query("SELECT * FROM seccion");
        res.json(arreglo);  
        }
        //Obtengo solo uno
        public async getOne(req: Request, res: Response ): Promise<any>{    
        const {id} =req.params;
        const arreglo = await pool.query('SELECT * FROM seccion where cod_seccion=?', [id]);     
        if(arreglo.length>0){
            return res.json(arreglo[0]);
        }else{
        res.status(404).json({text:'El seccion no existe '});}  
        }
    
        // Creo uno    
        public async create(req: Request, res: Response ){
        await pool.query('INSERT INTO seccion set ?', [req.body]);
        res.json({message: 'Horario Guardado'});    
        }
        // elimino
        public delete(req: Request, res: Response ){
            const {id}= req.params;
            pool.query('Delete from seccion where cod_seccion=?',[id]);
            res.json({messaage: 'El seccion fue eliminado'});
            
        }
    
        /// Actualizar 
        public async update(req: Request, res: Response ){
            const {id}=req.params;
            await pool.query('UPDATE seccion set ? WHERE  cod_seccion=?', [req.body,id]);
            res.json({massage: 'La seccion se ha actualizado'});
        }
        
        
     
    
 


}

export const seccionesController = new SeccionesController();