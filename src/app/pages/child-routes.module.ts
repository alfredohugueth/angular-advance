import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components */
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { AdminGuard } from '../guards/admin.guard';

const childRoutes : Routes = [

          {path: '', component:DashboardComponent, data: {titulo: 'Dashboard'}},
          {path: 'account-settings', component:AccountSettingsComponent ,data: {titulo: 'Ajustes de cuenta'}},
          {path: 'buscar/:termino', component:BusquedasComponent ,data: {titulo: 'Búsquedas'}},
          {path: 'grafica1', component:Grafica1Component ,data: {titulo: 'Gráfica #1'}},
          {path: 'progress', component:ProgressComponent ,data: {titulo: 'ProgressBar'}},
          {path: 'promesas', component:PromesasComponent ,data: {titulo: 'Promesas'}},
          {path: 'rxjs', component:RxjsComponent, data: {titulo: 'RxJs'}},
          {path: 'perfil', component:PerfilComponent, data: {titulo: 'Perfil de usuario'}},

          /* Mantenimientos */
          { path: 'hospitales', canActivate: [ AdminGuard ],  component : HospitalesComponent, data : { titulo : 'Mantenimiento de Hospitales' }},
          { path: 'medicos', canActivate: [ AdminGuard ], component : MedicosComponent, data : { titulo : 'Mantenimiento de Médicos' }},
          { path: 'medico/:id', component : MedicoComponent, data : { titulo : 'Mantenimiento de Médico' }},
          { path: 'usuarios', canActivate: [ AdminGuard ],  component : UsuariosComponent, data : { titulo : 'Mantenimiento de Usuarios' }},
]



@NgModule({
  imports: [RouterModule.forChild( childRoutes )],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
