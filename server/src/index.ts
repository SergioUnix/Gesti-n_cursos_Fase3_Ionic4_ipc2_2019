import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';


import usuariosRoutes from './routes/usuariosRoutes';
import horariosRoutes from './routes/horariosRoutes';
import seccionRoutes from './routes/seccionRoutes';
import cursos from './routes/cursos';
import asig_estuRoutes from './routes/asig_estuRoutes';
import asig_auxRoutes from './routes/asig_auxRoutes';
import forosRoutes from './routes/forosRoutes';
import evaluacionesRoutes from './routes/evaluacionesRoutes';
import ticketsRoutes from './routes/ticketsRoutes';
import actividadesRoutes from './routes/actividadesRoutes';
import conversRoutes from './routes/conversRoutes';

class Server {

    public app: Application ;
    constructor(){
        this.app=express();
        this.config();
        this.routes();
    }


    config(): void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json()); ///acepta desde angular archivos en formato json
        this.app.use(express.urlencoded({extended: false}));
        


    }

    routes(): void{
    
        this.app.use('/api/usuarios',usuariosRoutes);
        this.app.use('/api/horarios',horariosRoutes);
        this.app.use('/api/seccion',seccionRoutes);
        this.app.use('/api/cursos',cursos);
        this.app.use('/api/asig_estudiante',asig_estuRoutes);
        this.app.use('/api/asig_auxiliar',asig_auxRoutes);
        this.app.use('/api/foros',forosRoutes);
        this.app.use('/api/evaluaciones',evaluacionesRoutes);
        this.app.use('/api/tickets', ticketsRoutes);
        this.app.use('/api/actividades', actividadesRoutes);
        this.app.use('/api/conversaciones', conversRoutes);




        
    }

    
    start(): void {
        this.app.listen(this.app.get('port'), ()=>{
            console.log('Server on port', this.app.get('port'));

        });


    }


}

const server = new Server();
server.start();