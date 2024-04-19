import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChiamateService } from '../../chiamate.service';
import { Richieste } from '../../richieste';
import { FiltriComponent } from '../filtri/filtri.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-elenco',
  templateUrl: './elenco.component.html',
  styleUrl: './elenco.component.css'
})


export class ElencoComponent implements OnInit {

  
loading = true;
showSpinner = true;
richieste: Richieste[] = [];
paginaSelezionata: string = '5/pagina';




applicativo: any = [];
  statoRichiestaConsap: any = [];
  statoRichiestaOs: any = [];
  statoApprovazioneConsap: any = [];
  statoApprovazioneOs: any = [];

  isDropdownOpen: boolean = false;
  isFlag: boolean = false;

  constructor(private chiamateService: ChiamateService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
   /*  document.body.style.overflow = 'hidden'; */

    setTimeout(() => {
      this.loading=false;
      this.showSpinner = false;
      document.body.style.overflow = 'auto';
    }, 2000);


    this.richiestePost();
    this.applicativoPost();
    this.statoRichiestaConsapPost();
    this.statoRichiestaOsPost();
    this.statoApprovazioneConsapPost();
    this.statoApprovazioneOsPost();

  
    
  }

  richiestePost(){
    this.chiamateService.richiestePost().subscribe(data => {
      this.richieste = data.elenco.content;
      console.log("-------ELENCO RICHIESTE-------", data.elenco.content);
      
    })
  }




   cambiaDimensionePagina(event : MouseEvent) {
    const target = event.target as HTMLElement;
    const valueText = target.textContent || '';
    const value = parseInt(valueText.split('/')[0].trim(), 10);
    console.log("Dimensione pagina:", value);
    this.paginaSelezionata = valueText.trim();

   this.paginata(value).subscribe(data => {
      this.richieste = data.elenco.content;
      console.log("-------ELENCO RICHIESTE-------", data.elenco.content);
    })

     
  } 

  paginata(size:any):Observable<any> {
    const currentPage = 1;
      const urlElenco = `http://localhost:8080/richiesta/${currentPage}-${size}`;
  
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        console.log("ACCESS TOKEN NON TROVATO");
        
      }
  
      const body = {
        erroreDTO: null,
        filtri: {
          "id": null,
          "numeroTicket": null,
          "applicativoId": null,
          "oggetto": null,
          "statoRichiestaConsapId": null,
          "dataCreazione": null,
          "statoApprovazioneConsapId": null,
          "statoApprovazioneOsId": null,
          "statoRichiestaOsId": null,
          "dataStimaFinale": null,
          "importo": null,
          "commessaOsId": null
        },
        elenco: null
      };
  
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${accessToken}`);
  
      return this.http.post<any>(urlElenco, body, { headers });
  }



  redirect(richiesta:any){
    console.log(JSON.stringify(richiesta)+"invio?")
    console.log("CI SONO")
    this.router.navigate(["/visualizza"],{queryParams:{pippo : JSON.stringify(richiesta)}});
  } 

  applicativoPost(){
    this.chiamateService.applicativoPost().subscribe(data => {
      this.applicativo = data.elenco;
      console.log(data.elenco);
      //console.log(this.applicativo);
    })
  }
  statoRichiestaConsapPost(){
    this.chiamateService.statoRichiestaConsapPost().subscribe(data => {
      this.statoRichiestaConsap = data.elenco;
      console.log(data.elenco);
    })
  }
  
  statoRichiestaOsPost(){
    this.chiamateService.statoRichiestaOsPost().subscribe(data => {
      this.statoRichiestaOs = data.elenco;
      console.log(data.elenco);
    })
  }
  
  statoApprovazioneConsapPost(){
    this.chiamateService.statoApprovazioneConsapPost().subscribe(data => {
      this.statoApprovazioneConsap = data.elenco;
      console.log(data.elenco);
    })
  }
  
  statoApprovazioneOsPost(){
    this.chiamateService.statoApprovazioneOsPost().subscribe(data => {
      this.statoApprovazioneOs = data.elenco;
      console.log(data.elenco);
    })
  }
  



  
  filtraRichieste(){ 

    const numeroTicketFiltro= (<HTMLInputElement>(document.getElementById("numeroTicketFiltro"))).value;
    const numeroPars= numeroTicketFiltro==="" ? null : parseInt(numeroTicketFiltro);
    console.log("NUMERO FILTRO", numeroPars);

    const oggettoFiltro= (<HTMLInputElement>(document.getElementById("oggettoFiltro"))).value;
    const oggettoPars= oggettoFiltro==="" ? null : String(oggettoFiltro);
    console.log("OGGETTO FILTRO", oggettoPars);

    const applicativoFiltro= (<HTMLInputElement>(document.getElementById("applicativoFiltro"))).value;
    const applicativoPars= applicativoFiltro==="" ? null : parseInt(applicativoFiltro) || null;
    console.log("APPLICATIVO FILTRO", applicativoPars);

    const statoRichiestaConsapFiltro= (<HTMLInputElement>(document.getElementById("statoRichiestaConsapFiltro"))).value;
    const statoRichiestaConsapPars= statoRichiestaConsapFiltro==="" ? null : parseInt(statoRichiestaConsapFiltro) || null;
    console.log("STATO RICHIESTA CONSAP FILTRO", statoRichiestaConsapPars);

    const statoRichiestaOsFiltro= (<HTMLInputElement>(document.getElementById("statoRichiestaOsFiltro"))).value;
    const statoRichiestaOsPars= statoRichiestaOsFiltro==="" ? null : parseInt(statoRichiestaOsFiltro) || null;
    console.log("STATO RICHIESTA OS FILTRO", statoRichiestaOsPars);

    const statoApprovazioneConsapFiltro= (<HTMLInputElement>(document.getElementById("statoApprovazioneConsapFiltro"))).value;
    const statoApprovazioneConsapPars= statoApprovazioneConsapFiltro==="" ? null : parseInt(statoApprovazioneConsapFiltro) || null;
    console.log("STATO APPROVAZIONE CONSAP FILTRO", statoApprovazioneConsapPars); 

    const statoApprovazioneOsFiltro= (<HTMLInputElement>(document.getElementById("statoApprovazioneOsFiltro"))).value;
    const statoApprovazioneOsPars= statoApprovazioneOsFiltro==="" ? null : parseInt(statoApprovazioneOsFiltro) || null;
    console.log("STATO APPROVAZIONE OS FILTRO", statoApprovazioneOsPars);

    const dati={ 
        erroreDTO: null,
        filtri: {
          "id": null,
          "numeroTicket": numeroPars,
          "applicativo":{"applicativoId": applicativoPars},
          "oggetto": oggettoPars,
          "statoRichiestaConsap": {"statoRichiestaConsapId": statoRichiestaConsapPars},
          "dataCreazione": null,
          "statoApprovazioneConsap": {"statoApprovazioneConsapId": statoApprovazioneConsapPars},
          "statoApprovazioneOs": {"statoApprovazioneOsId": statoApprovazioneOsPars},
          "statoRichiestaOs": {"statoRichiestaOsId": statoRichiestaOsPars},
          "dataStimaFinale": null,
          "importo": null,
          "commessaOsId": null
        },
        elenco: null,    
    };
    console.log("DATI FILTRO", dati);
    

    this.chiamateService.richiestePostFiltrata(dati).subscribe(data => {
      this.richieste = data.elenco.content;
      console.log("-------ELENCO RICHIESTE-------", data.elenco.content);
    },
    error => {
      console.log(error);
    });
   
    
  
  
  
  }

  ripristinaFiltro(){
    const numeroTicketFiltro= (<HTMLInputElement>(document.getElementById("numeroTicketFiltro"))).value="";
    const oggettoFiltro= (<HTMLInputElement>(document.getElementById("oggettoFiltro"))).value="";
    const applicativoFiltro= (<HTMLInputElement>(document.getElementById("applicativoFiltro"))).value=null;
    const statoRichiestaConsapFiltro= (<HTMLInputElement>(document.getElementById("statoRichiestaConsapFiltro"))).value=null;
    const statoRichiestaOsFiltro= (<HTMLInputElement>(document.getElementById("statoRichiestaOsFiltro"))).value=null;
    const statoApprovazioneConsapFiltro= (<HTMLInputElement>(document.getElementById("statoApprovazioneConsapFiltro"))).value=null;
    const statoApprovazioneOsFiltro= (<HTMLInputElement>(document.getElementById("statoApprovazioneOsFiltro"))).value=null;
    this.richiestePost();
  }

  apriDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    const dropdownMenu = document.querySelector('.dropdown-menu2');
    dropdownMenu.classList.add('show');
  }
  
  chiudiDropdown() {
    this.isDropdownOpen = false;
    const dropdownMenu = document.querySelector('.dropdown-menu2');
    dropdownMenu.classList.remove('show');
  
  }

 

  apriChiudiDropdown() {
    
    if(this.isFlag=== false){
       const dropdown= document.getElementById('pagerChanger');
       if(dropdown){
         dropdown.classList.add('show');
         this.isFlag = true;
       }
    }
    else{
      const dropdown= document.getElementById('pagerChanger');
      if(dropdown){
        dropdown.classList.remove('show');
        this.isFlag = false;
      }
    }
  }

}
