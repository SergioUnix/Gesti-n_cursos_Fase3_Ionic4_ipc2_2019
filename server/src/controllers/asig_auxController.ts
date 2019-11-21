import {Request, Response} from 'express';
const pool = require ('../database');

class Asig_auxiliarController{
   
    
  
    
    // Obtengo una lista -------------
    public async list(req: Request, res: Response ){ 
        const arreglo =await pool.query("SELECT cod_asignacion_auxiliar, semestre, año as anio, fecha_limite, cod_usuario_fk, cod_curso_fk, usuario.nombre as auxiliar,curso.nombre as curso, seccion.nombre as seccion, horario.hora_inicio, horario.hora_final FROM asignacion_auxiliar INNER JOIN usuario ON cod_usuario_fk =cod_usuario inner join curso on cod_curso=cod_curso_fk inner Join seccion ON cod_seccion=cod_seccion_fk    inner join horario On cod_horario = cod_horario_fk;");
        res.json(arreglo);  
        }
        //Obtengo lista de cursos a los que esta asignado un usuario ------------
        public async getOne(req: Request, res: Response ): Promise<any>{    
        const {id} =req.params;
        const arreglo = await pool.query('SELECT cod_asignacion_auxiliar, semestre, año as anio, fecha_limite, cod_usuario_fk, cod_curso_fk, usuario.nombre as auxiliar,curso.nombre as curso, seccion.nombre as seccion, horario.hora_inicio, horario.hora_final FROM asignacion_auxiliar INNER JOIN usuario ON cod_usuario_fk =cod_usuario inner join curso on cod_curso=cod_curso_fk inner Join seccion ON cod_seccion=cod_seccion_fk    inner join horario On cod_horario = cod_horario_fk where cod_usuario_fk=?', [id]);     
        if(arreglo.length>0){
            return res.json(arreglo);
        }else{
        res.status(404).json({text:'La asignacion_auxiliar no existe '});}  
        }

        ///obtengo los datos de una sola asignación
        public async getAsignacion(req: Request, res: Response ): Promise<any>{    
            const {id} =req.params;
            const arreglo = await pool.query('SELECT * FROM proyecto_ionic.asignacion_auxiliar where cod_asignacion_auxiliar=?', [id]);     
            if(arreglo.length>0){
                return res.json(arreglo[0]);
            }else{
            res.status(404).json({text:'La asignacion_auxiliar no existe '});}  
            }
    
        // Creo uno    
        public async create(req: Request, res: Response ){
        await pool.query('INSERT INTO asignacion_auxiliar set ?', [req.body]);
        res.json({message: 'Asignacion_auxiliar Guardado'});    
        }
        // elimino
        public delete(req: Request, res: Response ){
            const {id}= req.params;
            pool.query('Delete from asignacion_auxiliar where cod_asignacion_auxiliar=?',[id]);
            res.json({messaage: 'La asignacion_auxiliar fue eliminada'});
            
        }
    
        /// Actualizar 
        public async update(req: Request, res: Response ){
            const {id}=req.params;
            await pool.query('UPDATE asignacion_auxiliar set ? WHERE  cod_asignacion_auxiliar=?', [req.body,id]);
            res.json({massage: 'Asignacion_auxiliar se ha actualizado'});
        }
        
        
      // Devuelvo el codigo de la ultima asignación_estudiante creada dado el codigo cod_usuario_fk
    public async ultimoRegistro(req: Request, res: Response ): Promise<any>{    
        const {id} =req.params;
        const ultimoregistro =await pool.query('select cod_asignacion_auxiliar from asignacion_auxiliar  where cod_usuario_fk=? order by cod_asignacion_auxiliar desc limit 1',[id]);
        res.json(ultimoregistro[0]);  
    }
     
        // Creo Foro despues de haber asignado al auxiliar al curso   
        public async createForo(req: Request, res: Response ){
            await pool.query('INSERT INTO foro set ?', [req.body]);
            res.json({message: 'Foro creado automaticamente'});    
            }

    public deleteForo(req: Request, res: Response ){
    const {id}= req.params;
    pool.query('Delete from foro where cod_asignacion_auxiliar_fk=?',[id]);
    res.json({messaage: 'Foro eliminado'});
               
    }

    
        // Creo un motivo para la desasignacion de un auxiliar    
        public async createMotivo(req: Request, res: Response ){
            await pool.query('INSERT INTO desasignacion set ?', [req.body]);
            res.json({message: 'Auxiliar Desasignado'});    
            }



}

export const asig_auxiliarController = new Asig_auxiliarController();