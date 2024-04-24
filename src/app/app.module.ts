import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componenti/login/login.component';
import { HomeComponent } from './componenti/home/home.component';
import { FooterComponent } from './componenti/footer/footer.component';
import { NavbarComponent } from './componenti/navbar/navbar.component';
import { ElencoComponent } from './componenti/elenco/elenco.component';
import { InserimentoComponent } from './componenti/inserimento/inserimento.component';
import { VisualizzaComponent } from './componenti/visualizza/visualizza.component';
import { FiltriComponent } from './componenti/filtri/filtri.component';
import { ModificaComponent } from './componenti/modifica/modifica.component';
import { PercorsoComponent } from './componenti/percorso/percorso.component';
import { HomeaccessoComponent } from './componenti/homeaccesso/homeaccesso.component';
import { JwtModule } from '@auth0/angular-jwt';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    ElencoComponent,
    InserimentoComponent,
    VisualizzaComponent,
    FiltriComponent,
    ModificaComponent,
    PercorsoComponent,
    HomeaccessoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['example.com'], // Domini consentiti (se necessario)
        disallowedRoutes: ['http://example.com/api/auth'] // Rotte non consentite (se necessario)
      }
    })

    
  ],
  providers: [
    provideClientHydration(),
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
