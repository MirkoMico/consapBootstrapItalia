import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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

 // @Input() filtriCambiati: Richieste[] = [];

  
loading = true;
showSpinner = true;
richieste: Richieste[] = [];
paginaSelezionata: string = '5/pagina';

//paginaSelezionata: string = "5"; // Assicurati che sia inizializzata correttamente
//paginaTotale: any[] = [1, 2, 3, 4, 5]; // Supponendo che sia un array di numeri
currentPage: any = 1; // Assicurati che sia inizializzata correttamente
pageSize: any = 5; // Assicurati che sia inizializzata correttamente
totalPages: any=0
  pagesArray = [];
  pagineVisualizzate: number[] = [];

  sortField: string = 'dataCreazione';
  sortOrder: string = 'desc';
  isSortOrderAsc = true;

  sortFieldTicket: string = 'numeroTicket';
  sortOrderTicket: string = 'desc';
  isSortOrderAscTicket = true;

  condizione: number = 0;

  
// Ora hai un array con tutti i numeri di pagina, puoi usare questo array per generare dinamicamente le pagine nel tuo template HTML


applicativo: any = [];
  statoRichiestaConsap: any = [];
  statoRichiestaOs: any = [];
  statoApprovazioneConsap: any = [];
  statoApprovazioneOs: any = [];

  isDropdownOpen: boolean = false;
  isFlag: boolean = false;

  constructor(private cdRef: ChangeDetectorRef,private chiamateService: ChiamateService, private router: Router, private http: HttpClient) {
   
  }

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
      this.totalPages = data.elenco.totalPages;
      console.log("-------TOTAL PAGES-------", this.totalPages);
      
      
    })
  }




    cambiaDimensionePagina(event : MouseEvent) {
    const target = event.target as HTMLElement;
    const valueText = target.textContent || '';
    const size = parseInt(valueText.split('/')[0].trim(), 10);
    console.log("Dimensione pagina:", size);
    this.paginaSelezionata = valueText.trim();


    this.pageSize = size;
    this.currentPage = 1;
   


   this.paginata(size).subscribe(data => {
      this.richieste = data.elenco.content;
      console.log("-------ELENCO RICHIESTE-------", data.elenco.content);
      this.totalPages = data.elenco.totalPages;
      console.log("-------TOTAL PAGES-------", this.totalPages);
      
    }) 
  }  
 

  prendiNumeroPagina(event : MouseEvent) {
    const target = event.target as HTMLElement;
    const valueText = target?.textContent || '';
    const currentPageSelezionato = parseInt(valueText.split('/')[0].trim(), 10);
    console.log("Dimensione pagina:", currentPageSelezionato);
   
    this.currentPage = currentPageSelezionato;
   
   this.numeroPaginata(currentPageSelezionato).subscribe(data => {
      this.richieste = data.elenco.content;
      console.log("-------ELENCO RICHIESTE-------", data.elenco.content);
      this.totalPages = data.elenco.totalPages;
      console.log("-------TOTAL PAGES-------", this.totalPages);
      
    }) 
  }  
  paginaPrecedente() {
    if (this.currentPage > 1) {
     let currentPageCopy = this.currentPage;
      currentPageCopy--;
      
      this.numeroPaginata(currentPageCopy).subscribe(data => {
        this.currentPage = currentPageCopy;
        this.richieste = data.elenco.content;
        console.log("-------ELENCO RICHIESTE-------", data.elenco.content);
        this.totalPages = data.elenco.totalPages;
        console.log("-------TOTAL PAGES-------", this.totalPages);
        
      })
      ;
      console.log("CURRENT PAGE", this.currentPage);
      
    }
  }
  
 
  paginaSuccessiva() {
    if (this.currentPage < this.totalPages) {
      let currentPageCopy = this.currentPage;
      currentPageCopy++;
      this.numeroPaginata(currentPageCopy).subscribe(data => {
        this.currentPage = currentPageCopy;
        this.richieste = data.elenco.content;
        console.log("pag corrente", this.currentPage);
        this.totalPages = data.elenco.totalPages;
        console.log("-------TOTAL PAGES-------", this.totalPages);
      });
      console.log("CURRENT PAGE", this.currentPage);
    }
  }
  
  

 /*  calcolaPagineVisualizzate() {
    const numPages = Math.ceil(this.totalPages / this.pageSize);
    this.pagineVisualizzate = Array.from({ length: numPages }, (_, i) => i + 1);
    // Se la pagina corrente è oltre l'ultima pagina disponibile, torna alla pagina finale
    if (this.currentPage > numPages) {
      this.currentPage = numPages;
    }
  } */

  private url= '';
  private urlBase= 'http://localhost:8080/richiesta/';
   numeroPaginata(currentPage:any):Observable<any> {
    //const currentPage = 1;

    if(this.condizione===0){
      this.url= this.urlBase+`${currentPage}-${this.pageSize}?campo=${this.sortField}&ordinamento=${this.sortOrder}`
      //const urlElenco = `http://localhost:8080/richiesta/${currentPage}-${this.pageSize}?campo=${this.sortField}&ordinamento=${this.sortOrder}`;
       console.log(this.url);
    } else if(this.condizione===1){
     
      this.url = this.urlBase+ `${currentPage}-${this.pageSize}?campo=${this.sortFieldTicket}&ordinamento=${this.sortOrderTicket}`;
      console.log(this.url); 
    }else if(this.condizione===2){
      
      this.url = this.urlBase+ `${currentPage}-${this.pageSize}?campo=${this.sortFieldTicket}&ordinamento='asc'`;
      console.log(this.url);
    } else if(this.condizione===3){
      this.url= this.urlBase+`${currentPage}-${this.pageSize}?campo=${this.sortField}&ordinamento='desc'`;
      console.log(this.url);
      
    }
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        console.log("ACCESS TOKEN NON TROVATO");
        
      } 

      
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
  
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${accessToken}`);
  
      return this.http.post<any>(this.url, dati, { headers });
  }



  

  paginata(size:any):Observable<any> {
    //const currentPage = 1;
     /*  const urlElenco = `http://localhost:8080/richiesta/${this.currentPage}-${size}`; */

     if(this.condizione===0){
      this.url= this.urlBase+`${this.currentPage}-${size}?campo=${this.sortField}&ordinamento=${this.sortOrder}`
      //const urlElenco = `http://localhost:8080/richiesta/${currentPage}-${this.pageSize}?campo=${this.sortField}&ordinamento=${this.sortOrder}`;
       console.log(this.url);
    }else if(this.condizione===1){
      //this.currentPage=1;
      this.url = this.urlBase+ `${this.currentPage}-${size}?campo=${this.sortFieldTicket}&ordinamento=${this.sortOrderTicket}`;
      console.log(this.url);
      
    } else if(this.condizione===2){
    //  this.currentPage=1;
      this.url = this.urlBase+ `${this.currentPage}-${size}?campo=${this.sortFieldTicket}&ordinamento='asc'`;
      console.log(this.url);
    } else if(this.condizione===3){
      this.url= this.urlBase+`${this.currentPage}-${size}?campo=${this.sortField}&ordinamento='desc'`
      console.log(this.url);
      
    }
       
     
      //const urlElenco = `http://localhost:8080/richiesta/${this.currentPage}-${this.pageSize}?campo=${this.sortField}&ordinamento=${this.sortOrder}`;
     
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        console.log("ACCESS TOKEN NON TROVATO");
        
      }
  
   

      
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
  
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${accessToken}`);
  
      return this.http.post<any>(this.url, dati, { headers });
  }
 

  // Metodo per cambiare il sortOrder
  changeSortOrderToAsc(): Observable<any> {
    // Aggiorna il sortOrder con 'asc'
    //this.sortOrder = 'asc';
    this.sortOrder = this.isSortOrderAsc ? 'asc' : 'desc';
    
    // Chiamata al metodo numeroPaginata con il nuovo sortOrder 'asc'
    return this.numeroPaginata(this.currentPage);
   // return this.chiamateService.richiestePost();
   
}


changeDataPag() {
  // Imposta manualmente il numero di pagina su 1
  this.currentPage = 1;

  // Chiama il metodo per cambiare il sortOrder e aggiornare la tabella
  this.changeSortOrderToAsc().subscribe(
    response => {
      // Gestisci la risposta se necessario
      console.log(response, "ASC");
      this.richieste = response.elenco.content;
      console.log("-------ELENCO RICHIESTE-------", response.elenco.content);
      this.totalPages = response.elenco.totalPages;
      console.log("-------TOTAL PAGES-------", this.totalPages);

        // Inverti lo stato dell'ordinamento per la prossima chiamata
        this.isSortOrderAsc = !this.isSortOrderAsc;

    },
    error => {
      console.error('Si è verificato un errore durante il cambio del sortOrder:', error);
    }
  );
}




/*  richiestePostTicketOrdinato() {
  // Cambia l'ordinamento ad ogni chiamata
  this.sortOrderTicket = this.isSortOrderAscTicket ? 'asc' : 'desc';
  
  // Chiamata al servizio con l'ordinamento corrente
  this.chiamateService.richiestePostTicket().subscribe(
    data => {
      // Aggiorna l'ordinamento della pagina solo quando ricevi la risposta
      this.richieste = data.elenco.content;
      console.log("-------ELENCO RICHIESTE-------", data.elenco.content);
      this.totalPages = data.elenco.totalPages;
      console.log("-------TOTAL PAGES-------", this.totalPages);
      console.log("-------ORDINAMENTO-------", this.sortOrderTicket);
      
      // Cambia il flag dell'ordinamento
      this.isSortOrderAscTicket = !this.isSortOrderAscTicket;
    },
    error => {
      console.error('Si è verificato un errore durante il recupero delle richieste:', error);
    }
  );
} */ 
 richiestePostTicketOrdinato() {
   if(this.sortOrderTicket === 'asc') {
    this.sortOrderTicket = 'desc';
    this.condizione = 1;
    this.currentPage = 1;
    this.chiamateService.richiestePostTicket('numeroTicket','desc',this.pageSize).subscribe(
      data => {
        // Aggiorna l'ordinamento della pagina solo quando ricevi la risposta
        this.richieste = data.elenco.content;
        console.log("-------ELENCO RICHIESTE-------", data.elenco.content);
        this.totalPages = data.elenco.totalPages;
        console.log("-------TOTAL PAGES-------", this.totalPages);
      }
    )
   }else  {
    
    this.sortOrderTicket = 'asc';
    this.condizione = 2;
    this.currentPage = 1;
    this.chiamateService.richiestePostTicket('numeroTicket','asc',this.pageSize).subscribe(
      data => {
        // Aggiorna l'ordinamento della pagina solo quando ricevi la risposta
        this.richieste = data.elenco.content;
        console.log("-------ELENCO RICHIESTE-------", data.elenco.content);
        this.totalPages = data.elenco.totalPages;
        console.log("-------TOTAL PAGES-------", this.totalPages);
      }
    )
   }
   if(this.sortField === 'dataCreazione') {
     
   }


  } 

 /*  currentSortOrder: string = 'asc';
  richiestePostTicketOrdinato() {
    // Determina l'ordinamento opposto
    const newSortOrder = this.currentSortOrder === 'asc' ? 'desc' : 'asc';

    this.currentPage = 1;
    
    // Effettua la chiamata al servizio con l'ordinamento opposto
    this.chiamateService.richiestePostTicket(newSortOrder).subscribe(
        data => {
            // Aggiorna l'ordinamento della pagina solo quando ricevi la risposta
            this.richieste = data.elenco.content;
            console.log("ordinamento", newSortOrder);
            
            console.log("-------ELENCO RICHIESTE-------", data.elenco.content);
            this.totalPages = data.elenco.totalPages;
            console.log("-------TOTAL PAGES-------", this.totalPages);
            
            // Aggiorna la variabile di stato con il nuovo ordinamento
            this.currentSortOrder = newSortOrder;
            console.log("-------ORDINAMENTO-------", this.currentSortOrder);
            this.cdRef.detectChanges();
        }
    ); */






  redirectVisualizza(richiestaId:any){
    /* console.log(JSON.stringify(richiesta)+"invio?")
    console.log("CI SONO")
    this.router.navigate(["/visualizza"],{queryParams:{pippo : JSON.stringify(richiesta)}}); */
    localStorage.setItem('idRichiesta', richiestaId.id);
    this.router.navigate(["/visualizza"]);
  } 
  redirectModifica(richiestaId:any){
    localStorage.setItem('idRichiesta', richiestaId.id);
    this.router.navigate(["/modifica"]);
   
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
    this.currentPage=1;

    if(this.condizione===0){
      this.url= this.urlBase+`${this.currentPage}-${this.pageSize}?campo=dataCreazione&ordinamento=desc`;
      //const urlElenco = `http://localhost:8080/richiesta/${currentPage}-${this.pagethis.pageSize}?campo=${this.sortField}&ordinamento=${this.sortOrder}`;
       console.log(this.url);
    }else if(this.condizione===1){
      //this.currentPage=1;
      this.url = this.urlBase+ `${this.currentPage}-${this.pageSize}?campo=numeroTicket&ordinamento=desc`;
      console.log(this.url);
      
    } else if(this.condizione===2){
    //  this.currentPage=1;
      this.url = this.urlBase+ `${this.currentPage}-${this.pageSize}?campo=numeroTicket&ordinamento=asc`;
      console.log(this.url);
    } else if(this.condizione===3){
      this.url= this.urlBase+`${this.currentPage}-${this.pageSize}?campo=dataCreazione&ordinamento=desc`
      console.log(this.url);
      
    }
       



    

    this.chiamateService.richiestePostFiltrata (dati,this.url).subscribe(data => {
      this.richieste = data.elenco.content;
      this.totalPages=data.elenco.totalPages;
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
