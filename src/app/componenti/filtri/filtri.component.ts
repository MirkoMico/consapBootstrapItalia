import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChiamateService } from '../../chiamate.service';
import { Richieste } from '../../richieste';

@Component({
  selector: 'app-filtri',
  templateUrl: './filtri.component.html',
  styleUrl: './filtri.component.css'
})
export class FiltriComponent implements OnInit {

  @Output() filtriCambiati: EventEmitter<Richieste[]> = new EventEmitter<Richieste[]>();

  

  constructor(private chiamateService: ChiamateService) { }
  richieste: Richieste[] = [];
  applicativo: any = [];
  statoRichiestaConsap: any = [];
  statoRichiestaOs: any = [];
  statoApprovazioneConsap: any = [];
  statoApprovazioneOs: any = [];
  isDropdownOpen: boolean = false;

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

ngOnInit(): void {
  this.applicativoPost();
  this.statoRichiestaConsapPost();
  this.statoRichiestaOsPost();
  this.statoApprovazioneConsapPost();
  this.statoApprovazioneOsPost();
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

/* 
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
    this.filtriCambiati.emit(this.richieste);
  },
  error => {
    console.log(error);
  });
 
  



}
 */
richiestePost(){
  this.chiamateService.richiestePost().subscribe(data => {
    this.richieste = data.elenco.content;
    console.log("-------ELENCO RICHIESTE-------", data.elenco.content);
    
  })
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

}
