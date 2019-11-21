import {Request, Response} from 'express';
const pool = require ('../database');

class EvaluacionesController{

    
    
    // Obtengo una lista cursos registrados
    public async list(req: Request, res: Response ){ 
        const arreglo =await pool.query("Select * From evaluacion");
        res.json(arreglo);  
        }
        //Obtengo un solo foro con el codigo de asignacion_auxiliar
        public async getOne(req: Request, res: Response ): Promise<any>{    
        const {id} =req.params;
        const arreglo = await pool.query('SELECT', [id]);     
        if(arreglo.length>0){
            return res.json(arreglo);
        }else{
        res.status(404).json({text:'El foro no existe '});}  
        }
    
        // Creo uno    
        public async create(req: Request, res: Response ){
        await pool.query('INSERT INTO evaluacion set ?', [req.body]);
        res.json({message: 'evaluacion se guardo'});    
        }
        // elimino
        public delete(req: Request, res: Response ){
            const {id}= req.params;
            pool.query('Delete from evaluacion where cod_evaluacion=?',[id]);
            res.json({messaage: 'la evaluacion fue eliminada'});
            
        }
    
        /// Actualizar 
        public async update(req: Request, res: Response ){
            const {id}=req.params;
            await pool.query('UPDATE evaluacion set ? WHERE  cod_evaluacion=?', [req.body,id]);
            res.json({massage: 'Evaluacion se ha actualizado'});
        }
        
         //Obtengo todos los cursos que se han asignado aun Auxiliar----
        public async getAsig(req: Request, res: Response ): Promise<any>{    
        const {id} =req.params;
        const arreglo = await pool.query('SELECT cod_asignacion_auxiliar, semestre, año as anio, fecha_limite, cod_usuario_fk, cod_curso_fk, usuario.nombre as auxiliar,curso.nombre as curso, seccion.nombre as seccion, horario.hora_inicio, horario.hora_final FROM asignacion_auxiliar INNER JOIN usuario ON cod_usuario_fk =cod_usuario inner join curso on cod_curso=cod_curso_fk inner Join seccion ON cod_seccion=cod_seccion_fk inner join horario On cod_horario = cod_horario_fk where cod_usuario_fk=?', [id]);     
        if(arreglo.length>0){
        return res.json(arreglo);
        }else{
        res.status(404).json({text:'La asignacion_auxiliar no existe '});}  
        }


         // encontrar evaluaciones creadas por un auxiliar y el tipo de evaluacion es Verdadero/Falso
        public async getEva_tipo1(req: Request, res: Response ){
    
        const {cod}=req.params;
        const evaluaciones = await pool.query("Select cod_evaluacion, evaluacion.nombre,evaluacion.estado, tipo_evaluacion, cod_asignacion_auxiliar_fk, usuario_fk_eva, curso.nombre as curso  ,evaluacion.orden, seccion.nombre as seccion FROM evaluacion INNER JOIN asignacion_auxiliar ON cod_asignacion_auxiliar =cod_asignacion_auxiliar_fk Inner join curso on cod_curso= cod_curso_fk Inner join seccion on cod_seccion= curso.cod_seccion_fk where usuario_fk_eva =?  and tipo_evaluacion='Verdadero/Falso'", [cod]);
        if(evaluaciones.length>0){
            return res.json(evaluaciones);
        }else{
        res.status(404).json({text:'No se encontro evaluaciones hechas por un auxiliar'});}
    } 

         // encontrar evaluaciones creadas por un auxiliar y el tipo de evaluacion es Selección Múltiple
         public async getEva_tipo2(req: Request, res: Response ){
    
            const {cod}=req.params;
            const evaluaciones = await pool.query("Select cod_evaluacion, evaluacion.nombre,evaluacion.estado, tipo_evaluacion, cod_asignacion_auxiliar_fk, usuario_fk_eva, curso.nombre as curso ,evaluacion.orden, seccion.nombre as seccion FROM evaluacion INNER JOIN asignacion_auxiliar ON cod_asignacion_auxiliar =cod_asignacion_auxiliar_fk Inner join curso on cod_curso= cod_curso_fk Inner join seccion on cod_seccion= curso.cod_seccion_fk  where usuario_fk_eva =?  and tipo_evaluacion='Selección Múltiple'", [cod]);
            if(evaluaciones.length>0){
                return res.json(evaluaciones);
            }else{
            res.status(404).json({text:'No se encontro evaluaciones hechas por un auxiliar'});}
        } 


         // encontrar evaluaciones creadas dado un Curso y tambien tipo de evaluacion  Verdadero/Falso
         public async getEva_tipo1_curso(req: Request, res: Response ){
    
            const {cod}=req.params;
            const evaluaciones = await pool.query("Select cod_evaluacion, evaluacion.nombre,evaluacion.estado, tipo_evaluacion, cod_asignacion_auxiliar_fk, usuario_fk_eva,curso.nombre as curso  ,evaluacion.orden, seccion.nombre as seccion FROM evaluacion INNER JOIN asignacion_auxiliar ON cod_asignacion_auxiliar =cod_asignacion_auxiliar_fk Inner join curso on cod_curso= cod_curso_fk Inner join seccion on cod_seccion= curso.cod_seccion_fk where cod_asignacion_auxiliar=? and tipo_evaluacion='Verdadero/Falso'", [cod]);
            if(evaluaciones.length>0){
                return res.json(evaluaciones);
            }else{
            res.status(404).json({text:'No se encontro evaluaciones hechas por un auxiliar'});}
        } 
    
             // encontrar evaluaciones creadas Dado un Curso y tambien tipo de evaluacion Selección Múltiple
             public async getEva_tipo2_curso(req: Request, res: Response ){
        
                const {cod}=req.params;
                const evaluaciones = await pool.query("Select cod_evaluacion, evaluacion.nombre,evaluacion.estado, tipo_evaluacion, cod_asignacion_auxiliar_fk, usuario_fk_eva, curso.nombre as curso  ,evaluacion.orden, seccion.nombre as seccion FROM evaluacion INNER JOIN asignacion_auxiliar ON cod_asignacion_auxiliar =cod_asignacion_auxiliar_fk Inner join curso on cod_curso= cod_curso_fk Inner join seccion on cod_seccion= curso.cod_seccion_fk where cod_asignacion_auxiliar=? and tipo_evaluacion='Selección Múltiple'", [cod]);
                if(evaluaciones.length>0){
                    return res.json(evaluaciones);
                }else{
                res.status(404).json({text:'No se encontro evaluaciones hechas por un auxiliar'});}
            } 


         // encontrar evaluaciones creadas dado un Usuario auxiliar y tambien tipo de evaluacion  Ordering
         public async getEva_tipo_orde(req: Request, res: Response ){
    
            const {cod}=req.params;
            const evaluaciones = await pool.query("Select cod_evaluacion, evaluacion.nombre,evaluacion.estado, tipo_evaluacion, cod_asignacion_auxiliar_fk, usuario_fk_eva, curso.nombre as curso  ,evaluacion.orden, seccion.nombre as seccion FROM evaluacion INNER JOIN asignacion_auxiliar ON cod_asignacion_auxiliar =cod_asignacion_auxiliar_fk Inner join curso on cod_curso= cod_curso_fk Inner join seccion on cod_seccion= curso.cod_seccion_fk where usuario_fk_eva =?  and tipo_evaluacion='Ordering'", [cod]);
            if(evaluaciones.length>0){
                return res.json(evaluaciones);
            }else{
            res.status(404).json({text:'No se encontro evaluaciones hechas '});}
        } 
    
             // encontrar evaluaciones creadas Dado un Usuario Auxiliar y tambien tipo de evaluacion Matching
             public async getEva_tipo_mat(req: Request, res: Response ){
        
                const {cod}=req.params;
                const evaluaciones = await pool.query("Select cod_evaluacion, evaluacion.nombre,evaluacion.estado, tipo_evaluacion, cod_asignacion_auxiliar_fk, usuario_fk_eva, curso.nombre as curso  ,evaluacion.orden, seccion.nombre as seccion FROM evaluacion INNER JOIN asignacion_auxiliar ON cod_asignacion_auxiliar =cod_asignacion_auxiliar_fk Inner join curso on cod_curso= cod_curso_fk Inner join seccion on cod_seccion= curso.cod_seccion_fk where usuario_fk_eva =?  and tipo_evaluacion='Matching'", [cod]);
                if(evaluaciones.length>0){
                    return res.json(evaluaciones);
                }else{
                res.status(404).json({text:'No se encontro evaluaciones '});}
            } 



         // encontrar evaluaciones creadas dado un Curso y tambien tipo de evaluacion  Ordering
         public async getEva_tipo_orde_curso(req: Request, res: Response ){
    
            const {cod}=req.params;
            const evaluaciones = await pool.query("Select cod_evaluacion, evaluacion.nombre,evaluacion.estado, tipo_evaluacion, cod_asignacion_auxiliar_fk, usuario_fk_eva,curso.nombre as curso  ,evaluacion.orden, seccion.nombre as seccion FROM evaluacion INNER JOIN asignacion_auxiliar ON cod_asignacion_auxiliar =cod_asignacion_auxiliar_fk Inner join curso on cod_curso= cod_curso_fk Inner join seccion on cod_seccion= curso.cod_seccion_fk where cod_asignacion_auxiliar=? and tipo_evaluacion='Ordering'", [cod]);
            if(evaluaciones.length>0){
                return res.json(evaluaciones);
            }else{
            res.status(404).json({text:'No se encontro evaluaciones hechas por un auxiliar'});}
        } 
    
             // encontrar evaluaciones creadas Dado un Curso y tambien tipo de evaluacion Matching
             public async getEva_tipo_mat_curso(req: Request, res: Response ){
        
                const {cod}=req.params;
                const evaluaciones = await pool.query("Select cod_evaluacion, evaluacion.nombre,evaluacion.estado, tipo_evaluacion, cod_asignacion_auxiliar_fk, usuario_fk_eva, curso.nombre as curso  ,evaluacion.orden, seccion.nombre as seccion FROM evaluacion INNER JOIN asignacion_auxiliar ON cod_asignacion_auxiliar =cod_asignacion_auxiliar_fk Inner join curso on cod_curso= cod_curso_fk Inner join seccion on cod_seccion= curso.cod_seccion_fk where cod_asignacion_auxiliar=? and tipo_evaluacion='Matching'", [cod]);
                if(evaluaciones.length>0){
                    return res.json(evaluaciones);
                }else{
                res.status(404).json({text:'No se encontro evaluaciones hechas por un auxiliar'});}
            } 









    // Funcion que cambia de esta un Curso de Disponible a Ocupado   
    public async updateEstado(req: Request, res: Response ){
        const {id}=req.params;
        await pool.query("UPDATE evaluacion set estado ='Habilitada'  WHERE  cod_evaluacion=?", [id]);
        res.json({massage: 'Estado Habilitado'});
    }     
    // Funcion que cambia de esta un Curso de Disponible a Ocupado   
    public async updateOrden(req: Request, res: Response ){
        const {id}=req.params;
        await pool.query("UPDATE evaluacion set orden ='Aleatorio'  WHERE  cod_evaluacion=?", [id]);
        res.json({massage: 'Orden Cambiado'});
    }      
   




    //// Crear Preguntas
        public async createPreguntas(req: Request, res: Response ){
        await pool.query('INSERT INTO pregunta set ?', [req.body]);
        res.json({message: 'se guardo pregunta'});    
        }
          //Obtengo todas las preguntas multiples dado un cod_evaluacion
        public async getMultiples(req: Request, res: Response ): Promise<any>{    
        const {id} =req.params;
        const arreglo = await pool.query('SELECT * FROM proyecto_ionic.pregunta inner join evaluacion on cod_evaluacion=pregunta.cod_evaluacion_fk where cod_evaluacion_fk=?', [id]);     
        if(arreglo.length>0){
        return res.json(arreglo);
        }else{
        res.status(404).json({text:'no existen preguntas'});}  
        }
    
         //Obtengo todas las preguntas Verdadero/Falso dado un cod_evaluacion
        public async getVerdadero(req: Request, res: Response ): Promise<any>{    
        const {id} =req.params;
        const arreglo = await pool.query('SELECT cod_asignacion_auxiliar, semestre, año as anio, fecha_limite, cod_usuario_fk, cod_curso_fk, usuario.nombre as auxiliar,curso.nombre as curso, seccion.nombre as seccion, horario.hora_inicio, horario.hora_final FROM asignacion_auxiliar INNER JOIN usuario ON cod_usuario_fk =cod_usuario inner join curso on cod_curso=cod_curso_fk inner Join seccion ON cod_seccion=cod_seccion_fk inner join horario On cod_horario = cod_horario_fk where cod_usuario_fk=?', [id]);     
        if(arreglo.length>0){
        return res.json(arreglo);
        }else{
        res.status(404).json({text:'No existen preguntas '});}  
        }




}

export const evaluacionesController = new EvaluacionesController();