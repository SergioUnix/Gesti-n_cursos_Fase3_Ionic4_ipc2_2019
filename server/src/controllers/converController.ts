import {Request, Response} from 'express';
const pool = require ('../database');

class ConversController{
       
    //todas las conversaciones de un usuario dado su cod_usuario
    public async conver_un_usuario(req: Request, res: Response ): Promise<any>{    
    const {nom} =req.params;
    const {id} =req.params;
    const usuarios = await pool.query('SELECT cod_usuario, mensaje.cod_usuario_destinatario as cod_destinatario, mensaje.cod_usuario_remitente, usuario.nombre as nom_destinatario, usuario.correo  FROM proyecto_ionic.mensaje inner join usuario on usuario.cod_usuario = mensaje.cod_usuario_destinatario and usuario.nombre !=?  or usuario.cod_usuario = mensaje.cod_usuario_remitente and usuario.nombre !=? where cod_usuario_destinatario =? or cod_usuario_remitente =? group by usuario.nombre', [nom,nom,id,id]);     
    if(usuarios.length>0){
        return res.json(usuarios);
    }else{
    res.status(404).json({text:'No existen conversaciones'});}  
    }

// obtengo mensajes entre dos usurios dao el cod_remitente y el cod_destinatario
    public async mensajes_dos_usuarios(req: Request, res: Response ): Promise<any>{    
        const {cod_r} =req.params;
        const {cod_d} =req.params;
        const usuarios = await pool.query('SELECT mensaje.cod_mensaje, mensaje.cod_usuario_remitente,usuario.nombre as nom_remitente, mensaje.cuerpo,mensaje.archivos_adjuntos, mensaje.asunto,mensaje.fecha as fecha , mensaje.cod_usuario_destinatario as cod_destinatario FROM proyecto_ionic.mensaje inner join usuario on usuario.cod_usuario = mensaje.cod_usuario_remitente where cod_usuario_remitente =? and  cod_usuario_destinatario=?  or cod_usuario_remitente =? and  cod_usuario_destinatario=?  order by cod_mensaje asc', [cod_r,cod_d,cod_d,cod_r]);     
        if(usuarios.length>0){
            return res.json(usuarios);
        }else{
        res.status(404).json({text:'No existen conversaciones'});}  
        }


  // Crear Mensaje
  public async createMensaje(req: Request, res: Response ){
    //console.log(req.body);
    await pool.query('INSERT INTO mensaje set ?', [req.body]);
    res.json({message: 'Mensaje Guardado'});  

    }
        
    // Cambia el estado de un mensaje de Visto a Eliminado  
    public async updateEliminado(req: Request, res: Response ){
        const {id}=req.params;
        await pool.query("UPDATE mensaje set cod_estado_fk =3  WHERE  cod_mensaje=?", [id]);
        res.json({massage: 'Estado eliminado solo para el usuario'});
    }

    //verifica si existe el correo y devuelve datos del usuario
    public async existCorreo(req: Request, res: Response ): Promise<any>{    
        const {correo} =req.params;
        const usuarios = await pool.query('SELECT * FROM proyecto_ionic.usuario where correo=?', [correo]);     
            if(usuarios.length>0){
            return res.json(usuarios[0]);
        }else{
        res.status(404).json({text:'No existen conversaciones'});}  
        }


    //verifica que la contraseña temporal sea acorde a la asignada al correo
    public async recuperar(req: Request, res: Response ): Promise<any>{    
        const {correo} =req.params;
        const {pass} =req.params;
        const usuarios = await pool.query('SELECT * FROM proyecto_ionic.usuario where correo=? and pasword=?', [correo,pass]);     
            if(usuarios.length>0){
            return res.json(usuarios[0]);
        }else{
        res.status(404).json({text:'No existen conversaciones'});}  
        }

        
    
}

export const conversController = new ConversController();
