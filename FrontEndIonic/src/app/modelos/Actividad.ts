export interface Actividad  {
    cod_actividad?: number;
    nombre?: string;
    hora?: string;
    fecha_limite?:string;
    ponderacion?: string;
    archivo?: string;
    texto?: string;
    ruta_archivo?: string;
    cod_asignacion_auxiliar_fk?: number;
    cod_usuario_fk?: number;
    cod_actividad_padre?:number;
}