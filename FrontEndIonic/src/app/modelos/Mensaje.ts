export interface Mensaje  {
    cod_mensaje?: number;
    asunto?:string;
    cuerpo?:string;
    archivos_adjuntos?:string;
    fecha?: string;
    cod_usuario_remitente?: number;
    cod_usuario_destinatario?:number;
}