import { Component, OnInit } from '@angular/core';
import { ChiamateService } from '../../chiamate.service';
import { log } from 'console';
import { Richieste } from '../../richieste';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-inserimento',
  templateUrl: './inserimento.component.html',
  styleUrl: './inserimento.component.css'
})
export class InserimentoComponent implements OnInit {

  nuovaRichiesta!: Richieste;

 //addRichiestaForm!: FormGroup;

 dataCreazione: string = '';


  applicativo: any = [];
  statoRichiestaConsap: any = [];
  statoRichiestaOs: any = [];
  statoApprovazioneConsap: any = [];
  statoApprovazioneOs: any = [];
  commessaOs: any = [];
  
  constructor(private chiamateService: ChiamateService, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.applicativoPost();
    this.statoRichiestaConsapPost();
    this.statoRichiestaOsPost();
    this.statoApprovazioneConsapPost();
    this.statoApprovazioneOsPost();
    this.commessaOsPost();

    /* this.addRichiestaForm = this.formBuilder.group({
      numeroTicket: ['', Validators.required], // Esempio di campo richiesto
      oggetto: ['', Validators.required],
      applicativo: ['', Validators.required],
      statoRichiestaConsap: ['', Validators.required],
      dataCreazione: ['', Validators.required],
      statoApprovazioneConsap: ['', Validators.required],
      statoRichiestaOs: ['', Validators.required],
      statoApprovazioneOs: ['', Validators.required],
      dataStimaFine: ['', Validators.required],
      importo: ['', Validators.required],
      commessaOs: ['', Validators.required],
      // Aggiungi altri campi se necessario
    }); */
    
  }
  
  
  
  applicativoPost(){
    this.chiamateService.applicativoPost().subscribe(data => {
      this.applicativo = data.elenco;
      console.log(data.elenco);
      console.log(this.applicativo);
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

  commessaOsPost(){
    this.chiamateService.commessaOsPost().subscribe(data => {
      this.commessaOs = data.elenco;
      console.log(data.elenco);
    })
  }

  

 





   addRichiesta(){
    //prendo il valore di ciascun campo tramite id in html
    const numeroTicket = (<HTMLInputElement>(
      document.getElementById('numeroTicket')
    )).value;
    const numeroTicketParsed = parseInt(numeroTicket);

    const oggetto = (<HTMLInputElement>document.getElementById('oggetto')).value;
    const oggettoParsed: string = String(oggetto);  
    
    const applicativo = (<HTMLSelectElement>(
      document.getElementById('applicativo')
      )).value;
    const applicativoParsed = applicativo ==='' ? null : parseInt(applicativo);
    
    const dataCreazione = (<HTMLInputElement>(
      document.getElementById('dataCreazione')
    )).value;
    const dataCreazioneParsed: string = String(dataCreazione);

    const statoRichiestaConsap = (<HTMLSelectElement>(
      document.getElementById('statoRichiestaConsap')
    )).value;
    const statoRichiestaConsapParsed = statoRichiestaConsap === '' ? null : parseInt(statoRichiestaConsap);


    const importo = (<HTMLInputElement>document.getElementById('importo'))
      .value;
      const importoParsed = importo === '' ? null : importo;

    const statoApprovazioneConsap = (<HTMLSelectElement>(
      document.getElementById('statoApprovazioneConsap')
    )).value;

    const statoApprovazioneConsapParsed = statoApprovazioneConsap === '' ? null : parseInt(statoApprovazioneConsap);
    

    const statoApprovazioneOs = (<HTMLSelectElement>(
      document.getElementById('statoApprovazioneOs')
    )).value;
    const statoApprovazioneOsParsed = statoApprovazioneOs === '' ? null : parseInt(statoApprovazioneOs);

    const statoRichiestaOs = (<HTMLSelectElement>(
      document.getElementById('statoRichiestaOs')
    )).value;
    const statoRichiestaOsParsed = statoRichiestaOs === '' ? null : parseInt(statoRichiestaOs);
    
    const dataStimaFinale = (<HTMLInputElement>(
      document.getElementById('dataStimaFinale')
    )).value;

    const dataStimaFinaleParsed = dataStimaFinale === '' ? null : String(dataStimaFinale);
  
    const commessaOs = (<HTMLSelectElement>(
      document.getElementById('commessaOs')
    )).value;
    const commessaOsParsed = parseInt(commessaOs);

    
    
    const dati = {
      erroreDTO: null,
      filtri: null,
      elenco: 
      [
          {
              id: null,
              numeroTicket: numeroTicketParsed,
              applicativo: {
                  applicativoId: applicativoParsed
              },
              oggetto: oggettoParsed,
              statoRichiestaConsap: {
                  statoRichiestaConsapId: statoRichiestaConsapParsed
              },
              dataCreazione: dataCreazioneParsed,
              statoApprovazioneConsap: {
                  statoApprovazioneConsapId: statoApprovazioneConsapParsed
              },
              statoApprovazioneOs: {
                  statoApprovazioneOsId: statoApprovazioneOsParsed
              },
              statoRichiestaOs: {
                  statoRichiestaOsId: statoRichiestaOsParsed
              },
              dataStimaFinale: dataStimaFinaleParsed,
              importo: importoParsed,
              commessaOs: {
                  commessaOsId: commessaOsParsed
              }
          }
      ]
  };
    this.chiamateService.createRichiesta(dati).subscribe((data) => {
      console.log("RICHIESTA SALVATA:",dati);
      
    }, (error) => {
      console.error(error);
    })
   
  } 
  
  


   /* onSubmit(){
    console.log(this.addRichiestaForm.value.numeroTicket, "numero ticket");
    console.log(this.addRichiestaForm.value.oggetto, "oggetto");
    console.log(this.addRichiestaForm.value.applicativo, "applicativo");
    console.log(this.addRichiestaForm.value, "form");

    this.addRichiesta()
    
    
  }  */



openSalva() {
  const numeroTicket = (<HTMLInputElement>(
    document.getElementById('numeroTicket')
  )).value;

  const oggetto = (<HTMLInputElement>(
    document.getElementById('oggetto')
  )).value;

  const applicativo = (<HTMLSelectElement>(
    document.getElementById('applicativo')
  )).value;

  const dataCreazione = (<HTMLInputElement>(
    document.getElementById('dataCreazione')
  )).value;

  let campiMancanti = "";

  if (!numeroTicket ||  !/^\d{5}$/.test(numeroTicket )) {
    campiMancanti += "Numero Ticket (5 caratteri numerici), ";
  }
  

  if (!oggetto) {
    campiMancanti += "Oggetto, ";
  }

  if (!applicativo) {
    campiMancanti += "Applicativo, ";
  }

  if (!dataCreazione) {
    campiMancanti += "Data Creazione, ";
  }

  if (campiMancanti) {
    alert("Campi obbligatori non completi: " + campiMancanti.slice(0, -2));
  } else {
    // Tutti i campi sono stati compilati correttamente
    const modal = document.getElementById('modal1');
      
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  
  }
}

aggiornaDataCreazione() {
  const dataCreazioneElement = document.getElementById('dataCreazione') as HTMLInputElement;
  this.dataCreazione = dataCreazioneElement.value;

}


  chiudiSalva(){
    const modal =document.getElementById('modal1');
    if(modal){
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }


  refreshPage(){
    window.location.reload();
  }

  showErrorNumeroTicket = false;

  checkNumeroTicket(event: any) {
    const inputText = event.target.value;
    this.showErrorNumeroTicket = !(/^\d{5}$/.test(inputText));
  }


}
