import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'logueo',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'logueo', loadChildren: './pages/logueo/logueo.module#LogueoPageModule' },
  { path: 'registro', loadChildren: './pages/registro/registro.module#RegistroPageModule' },
  { path: 'horario-form', loadChildren: './pages/horario-form/horario-form.module#HorarioFormPageModule' },
  { path: 'horario-edit/:id', loadChildren: './pages/horario-edit/horario-edit.module#HorarioEditPageModule' },
  { path: 'seccion-form', loadChildren: './pages/seccion-form/seccion-form.module#SeccionFormPageModule' },
  { path: 'seccion-edit/:id', loadChildren: './pages/seccion-edit/seccion-edit.module#SeccionEditPageModule' },
  { path: 'curso', loadChildren: './pages/curso/curso.module#CursoPageModule' },
  { path: 'curso-edit/:id', loadChildren: './pages/curso-edit/curso-edit.module#CursoEditPageModule' },
  { path: 'asignacion-auxiliar', loadChildren: './pages/asignacion-auxiliar/asignacion-auxiliar.module#AsignacionAuxiliarPageModule' },
  { path: 'foro/:id', loadChildren: './pages/foro/foro.module#ForoPageModule' },
  { path: 'asignar', loadChildren: './pages/asignar/asignar.module#AsignarPageModule' },
  { path: 'foro/publicacion/:id', loadChildren: './pages/publica-list/publica-list.module#PublicaListPageModule' },
  { path: 'evaluaciones-vista/:id', loadChildren: './pages/evaluaciones-vista/evaluaciones-vista.module#EvaluacionesVistaPageModule' },
  { path: 'evaluacion', loadChildren: './pages/evaluacion/evaluacion.module#EvaluacionPageModule' },
  { path: 'actividad', loadChildren: './pages/actividad/actividad.module#ActividadPageModule' },
  { path: 'actividad-realizar/:id', loadChildren: './pages/actividad-realizar/actividad-realizar.module#ActividadRealizarPageModule' },
  { path: 'actividades-crear-nota/:id', loadChildren: './pages/actividades-crear-nota/actividades-crear-nota.module#ActividadesCrearNotaPageModule' },
 
  { path: 'actividades-ver-notas', loadChildren: './pages/actividades-ver-notas/actividades-ver-notas.module#ActividadesVerNotasPageModule' },
  { path: 'actividades-vista/:id', loadChildren: './pages/actividades-vista/actividades-vista.module#ActividadesVistaPageModule' },
  { path: 'ticket', loadChildren: './pages/ticket/ticket.module#TicketPageModule' },
  { path: 'ver-notas', loadChildren: './pages/ver-notas/ver-notas.module#VerNotasPageModule' },
  { path: 'registro-auxiliar', loadChildren: './pages/registro-auxiliar/registro-auxiliar.module#RegistroAuxiliarPageModule' },
  { path: 'lista-usuarios', loadChildren: './pages/lista-usuarios/lista-usuarios.module#ListaUsuariosPageModule' },
  { path: 'lista-usuarios-edit/:id', loadChildren: './pages/lista-usuarios-edit/lista-usuarios-edit.module#ListaUsuariosEditPageModule' },
  { path: 'ticket-admin', loadChildren: './pages/ticket-admin/ticket-admin.module#TicketAdminPageModule' },
  { path: 'auxiliar-desasignar', loadChildren: './pages/auxiliar-desasignar/auxiliar-desasignar.module#AuxiliarDesasignarPageModule' },
  { path: 'auxiliar-desasignar-motivo/:id', loadChildren: './pages/auxiliar-desasignar-motivo/auxiliar-desasignar-motivo.module#AuxiliarDesasignarMotivoPageModule' },
  { path: 'actividades-cursos-calificar', loadChildren: './pages/actividades-cursos-calificar/actividades-cursos-calificar.module#ActividadesCursosCalificarPageModule' },
  { path: 'destinatario', loadChildren: './pages/destinatario/destinatario.module#DestinatarioPageModule' },
  { path: 'privado/:id', loadChildren: './pages/privado/privado.module#PrivadoPageModule' },
  { path: 'registro-olvido', loadChildren: './pages/registro-olvido/registro-olvido.module#RegistroOlvidoPageModule' },
  { path: 'registro-olvido-restablecer', loadChildren: './pages/registro-olvido-restablecer/registro-olvido-restablecer.module#RegistroOlvidoRestablecerPageModule' },
  { path: 'asistencia-crear/:id', loadChildren: './pages/asistencia-crear/asistencia-crear.module#AsistenciaCrearPageModule' },
  { path: 'reporte-asistencia', loadChildren: './pages/reporte-asistencia/reporte-asistencia.module#ReporteAsistenciaPageModule' },
  { path: 'evaluacion-pregunta-mat/:id', loadChildren: './pages/evaluacion-pregunta-mat/evaluacion-pregunta-mat.module#EvaluacionPreguntaMatPageModule' },
  { path: 'evaluacion-pregunta-orde/:id', loadChildren: './pages/evaluacion-pregunta-orde/evaluacion-pregunta-orde.module#EvaluacionPreguntaOrdePageModule' },
  { path: 'evaluacion-pregunta-fv/:id', loadChildren: './pages/evaluacion-pregunta-fv/evaluacion-pregunta-fv.module#EvaluacionPreguntaFvPageModule' },
  { path: 'evaluacion-pregunta-sm/:id', loadChildren: './pages/evaluacion-pregunta-sm/evaluacion-pregunta-sm.module#EvaluacionPreguntaSmPageModule' },
  


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
