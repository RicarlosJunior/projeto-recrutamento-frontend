import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { VagaslistComponent } from './components/vagas/vagaslist/vagaslist.component';
import { VagasdetailsComponent } from './components/vagas/vagasdetails/vagasdetails.component';
import { AuthGuard } from './auth/auth.guard';
import { CandidaturaslistComponent } from './components/candidaturas/candidaturaslist/candidaturaslist.component';
import { UsuarioslistComponent } from './components/usuarios/usuarioslist/usuarioslist.component';
import { UsuariosdetailsComponent } from './components/usuarios/usuariosdetails/usuariosdetails.component';

export const routes: Routes = [
    {path: "", redirectTo:"login", pathMatch:'full'},
    {path: "login", component: LoginComponent},
    {path: "principal", component: PrincipalComponent, canActivate: [AuthGuard], children: [
        {path: "usuarios", component: UsuarioslistComponent, canActivate: [AuthGuard]},
        {path: "usuarios/criar", component: UsuariosdetailsComponent, canActivate: [AuthGuard]},
        {path: "usuarios/alterar/:id", component: UsuariosdetailsComponent, canActivate: [AuthGuard]},
        {path: "vagas", component: VagaslistComponent, canActivate: [AuthGuard]},
        {path: "vagas/criar", component: VagasdetailsComponent, canActivate: [AuthGuard]},
        {path: "vagas/alterar/:id", component: VagasdetailsComponent, canActivate: [AuthGuard]},
        {path: "candidaturas", component: CandidaturaslistComponent, canActivate: [AuthGuard]},
    ]},
];
