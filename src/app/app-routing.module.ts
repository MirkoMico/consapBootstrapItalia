import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './componenti/login/login.component';
import { HomeComponent } from './componenti/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ElencoComponent } from './componenti/elenco/elenco.component';
import { InserimentoComponent } from './componenti/inserimento/inserimento.component';
import { VisualizzaComponent } from './componenti/visualizza/visualizza.component';
import { FiltriComponent } from './componenti/filtri/filtri.component';
import { ModificaComponent } from './componenti/modifica/modifica.component';
import { HomeaccessoComponent } from './componenti/homeaccesso/homeaccesso.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },

  { path: 'homeaccesso', component: HomeaccessoComponent, canActivate: [AuthGuard] },
  { path: 'elenco', component: ElencoComponent, canActivate: [AuthGuard] },
  { path: 'inserimento', component: InserimentoComponent, canActivate: [AuthGuard] },
  { path: 'visualizza', component: VisualizzaComponent, canActivate: [AuthGuard] },
  {path: 'modifica', component: ModificaComponent, canActivate: [AuthGuard]},
  { path: 'filtri', component: FiltriComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
