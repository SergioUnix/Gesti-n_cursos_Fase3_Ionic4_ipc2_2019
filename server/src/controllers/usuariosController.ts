import {Request, Response} from 'express';
const pool = require ('../database');

class UsuariosController{
    // Obtengo una lista menos el usuario administrador --------------
    public async list(req: Request, res: Response ){ 
    const usuarios=await pool.query('SELECT cod_usuario, usuario.nombre, carne, correo, pasword, cod_rol_fk, rol.nombre as rol FROM proyecto_ionic.usuario inner join rol on rol.cod_rol = usuario.cod_rol_fk where usuario.cod_rol_fk !=1');
    res.json(usuarios);  
    }


    // Obtengo una lista de Auxiliares
    public async list_auxiliar(req: Request, res: Response ){ 
        const usu=await pool.query('SELECT * FROM usuario where cod_rol_fk=2');
        res.json(usu);  
        }
    
    
    //Obtengo solo uno
    public async getOne(req: Request, res: Response ): Promise<any>{    
    const {id} =req.params;
    const usuarios = await pool.query('SELECT * FROM usuario WHERE cod_usuario =?', [id]);     
    if(usuarios.length>0){
        return res.json(usuarios[0]);
    }else{
    res.status(404).json({text:'El usuario no existe '});}  
    }
    // Creo  
    public async create(req: Request, res: Response ){
    //console.log(req.body);
    await pool.query('INSERT INTO usuario set ?', [req.body]);
    res.json({message: 'Usuario Guardado'});  

    }
    // Elimino
    public delete(req: Request, res: Response ){
        const {id}= req.params;
        pool.query('DELETE FROM usuario WHERE cod_usuario =?',[id]);
        res.json({messaage: 'El usuario fue eliminado'});
        
    }
    // Actualizar
    public async update(req: Request, res: Response ){
        const {id}=req.params;
        await pool.query('UPDATE usuario set ? WHERE  cod_usuario=?', [req.body,id]);
        res.json({massage: 'El usuario se ha sido actualizado'});
    }
    // encontrar usuario para el login
    public async login(req: Request, res: Response ){
        //const {id}=req.params;
        const {correo}=req.params;
        const {pass}=req.params;
        const usuarios = await pool.query("Select * from usuario where correo=? and pasword=?", [correo,pass]);
        if(usuarios.length>0){
            return res.json(usuarios[0]);
        }else{
        res.status(404).json({text:'El usuario no encontrado'});} 



        
    }
    
    




}

export const usuariosController = new UsuariosController();
