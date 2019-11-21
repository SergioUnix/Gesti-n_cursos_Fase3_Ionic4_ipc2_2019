export interface Curso  {
    cod_curso?: number;
    nombre?: string;
    descripcion?: string;
    estado?:string;
    cod_horario_fk?: number;
    cod_seccion_fk?: number;
}