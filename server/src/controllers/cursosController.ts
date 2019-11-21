import {Request, Response} from 'express';
const pool = require ('../database');

class CursosController{

    
    
    // Obtengo una lista cursos registrados
    public async list(req: Request, res: Response ){ 
        const arreglo =await pool.query("select cod_curso, curso.nombre, descripcion, estado, cod_horario_fk, cod_seccion_fk , horario.hora_inicio, horario.hora_final, seccion.nombre as seccion FROM curso INNER JOIN horario ON cod_horario_fk = cod_horario INNer JOIN seccion ON cod_seccion_fk = cod_seccion");
        res.json(arreglo);  
        }
        //Obtengo solo uno
        public async getOne(req: Request, res: Response ): Promise<any>{    
        const {id} =req.params;
        const arreglo = await pool.query('SELECT * FROM curso where cod_curso=?', [id]);     
        if(arreglo.length>0){
            return res.json(arreglo[0]);
        }else{
        res.status(404).json({text:'El curso no existe '});}  
        }
    
        // Creo uno    
        public async create(req: Request, res: Response ){
        await pool.query('INSERT INTO curso set ?', [req.body]);
        res.json({message: 'Curso Guardado'});    
        }
        // elimino
        public delete(req: Request, res: Response ){
            const {id}= req.params;
            pool.query('Delete from curso where cod_curso=?',[id]);
            res.json({messaage: 'El curso fue eliminado'});
            
        }
    
        /// Actualizar 
        public async update(req: Request, res: Response ){
            const {id}=req.params;
            await pool.query('UPDATE curso set ? WHERE  cod_curso=?', [req.body,id]);
            res.json({massage: 'El curso se ha sido actualizado'});
        }
        
        
     




    // Obtengo una lista de los cursos disponibles
    public async listDisponibles(req: Request, res: Response ){ 
        const arreglo =await pool.query("select cod_curso, curso.nombre, descripcion, estado, cod_horario_fk, cod_seccion_fk , horario.hora_inicio, horario.hora_final, seccion.nombre as seccion FROM curso INNER JOIN horario ON cod_horario_fk = cod_horario INNer JOIN seccion ON cod_seccion_fk = cod_seccion where estado='Disponible' ");
        res.json(arreglo);  
        }

    // Funcion que cambia de esta un Curso de Disponible a Ocupado   
    public async updateDis(req: Request, res: Response ){
        const {id}=req.params;
        await pool.query("UPDATE curso set estado ='Disponible'  WHERE  cod_curso=?", [id]);
        res.json({massage: 'Estado disponible'});
    }
    // Funcion que cambia de esta un Curso de Disponible a Ocupado   
    public async updateOcup(req: Request, res: Response ){
        const {id}=req.params;
        await pool.query("UPDATE curso set estado ='Ocupado'  WHERE  cod_curso=?", [id]);
        res.json({massage: 'Estado Ocupado'});
    }



     ////existe asignacion para un usuario
     public async exist(req: Request, res: Response ){ 
        const {curso}=req.params;
        const {seccion}=req.params;
        const usuarios = await pool.query("Select * from proyecto_ionic.curso where nombre=? and cod_seccion_fk = ?", [curso,seccion]);
        if(usuarios.length>0){
            return res.json(usuarios[0]);
        }else{
        res.status(404).json({text:'No se encontro el nombre con seccion igual'});} 
        }
         

}

export const cursosController = new CursosController();