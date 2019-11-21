import {Request, Response} from 'express';
const pool = require ('../database');

class ForosController{

    
    
    // Obtengo una lista cursos registrados
    public async list(req: Request, res: Response ){ 
        const arreglo =await pool.query("Select * From foro");
        res.json(arreglo);  
        }
        //Obtengo un solo foro con el codigo de asignacion_auxiliar
        public async getOne(req: Request, res: Response ): Promise<any>{    
        const {id} =req.params;
        const arreglo = await pool.query('SELECT * FROM foro where cod_asignacion_auxiliar_fk=?', [id]);     
        if(arreglo.length>0){
            return res.json(arreglo);
        }else{
        res.status(404).json({text:'El foro no existe '});}  
        }
    
        // Creo uno    
        public async create(req: Request, res: Response ){
        await pool.query('INSERT INTO foro set ?', [req.body]);
        res.json({message: 'Foro guardado Guardado'});    
        }
        // elimino
        public delete(req: Request, res: Response ){
            const {id}= req.params;
            pool.query('Delete from foro where cod_foro=?',[id]);
            res.json({messaage: 'El foro fue eliminado'});
            
        }
    
        /// Actualizar 
        public async update(req: Request, res: Response ){
            const {id}=req.params;
            await pool.query('UPDATE foro set ? WHERE  cod_asignacion_auxiliar_fk=?', [req.body,id]);
            res.json({massage: 'El foro se ha sido actualizado'});
        }
        
        
    // Obtengo las publicaciones tipo padre 
    public async listPadres(req: Request, res: Response ){ 
    const {id} =req.params;
    const arreglo =await pool.query("Select cod_publicacion, comentario, ref_publi, creador_pu_usuario, cod_foro_fk, usuario.nombre, usuario.cod_usuario, rol.nombre as rol, me_gusta  from publicacion inner join usuario on creador_pu_usuario = usuario.cod_usuario inner join rol on rol.cod_rol=usuario.cod_rol_fk where publicacion.ref_publi is null and cod_foro_fk=? order by cod_publicacion desc", [id]);
    res.json(arreglo);  
    }
    
   //Obtengo la lista de hijos de un solo padre dado el ref_publi que es el codigo del padre
    public async listaHijos(req: Request, res: Response ): Promise<any>{    
    const {id} =req.params;
    const arreglo = await pool.query('Select cod_publicacion, comentario, ref_publi, creador_pu_usuario, cod_foro_fk, usuario.nombre, usuario.cod_usuario , rol.nombre as rol, me_gusta  from publicacion inner join usuario on creador_pu_usuario = usuario.cod_usuario inner join rol on usuario.cod_rol_fk = rol.cod_rol where publicacion.ref_publi is not null and ref_publi=? order by cod_publicacion desc', [id]);     
        if(arreglo.length>0){
        return res.json(arreglo);
        }else{
        res.status(404).json({text:'No existen hijos para tal padre '});}  
    }
    // Creo uno    
    public async createPadre(req: Request, res: Response ){
    await pool.query('INSERT INTO publicacion set ?', [req.body]);
    res.json({message: 'publicacion padre guardada'});    
    }

    // Creo uno    
    public async createHijo(req: Request, res: Response ){
    await pool.query('INSERT INTO publicacion set ?', [req.body]);
    res.json({message: 'publicacion hijo guardada'});    
    }


///Actualizo un me gusta
    public async meGusta(req: Request, res: Response ){
        const {id}=req.params;
        await pool.query('UPDATE publicacion set ? WHERE  cod_publicacion=?', [req.body,id]);
        res.json({massage: 'Me gusta Actualizado'});
    }


}

export const forosController = new ForosController();