export interface Usuario   {
    cod_usuario?: number;
    nombre?: string;
    carne?: string;
    correo?: string;
    pasword?: string;
    cod_rol_fk?: number;
}