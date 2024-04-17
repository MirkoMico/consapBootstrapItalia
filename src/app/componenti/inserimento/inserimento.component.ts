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

 addRichiestaForm!: FormGroup;


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

    this.addRichiestaForm = this.formBuilder.group({
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
    });
    
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

  /* parsNumeroTicket: number;
  parsApplicativo: number;
  parsStatoRichiestaConsap: number;
  parsStatoRichiestaOs: number;
  parsStatoApprovazioneConsap: number;
  parsStatoApprovazioneOs: number;
  parsCommessaOs: number;
  parsImporto: number;

  oggetto: string;
 parsDataCreazione: Date;
  dataStimaFine: any;
  dataCreazione: any; */


 





   addRichiesta(){
    /* const nuovaRichiesta={

      
      
      numeroTicket: this.addRichiestaForm.value.numeroTicket,
  
      
      oggetto: this.addRichiestaForm.value.oggetto,
      applicativo: {applicativoId:this.addRichiestaForm.value.applicativo,descApplicativo: null },
      statoRichiestaConsap:{statoRichiestaConsapId: this.addRichiestaForm.value.statoRichiestaConsap,descStatoRichiestaConsap: null},
      //dataCreazione: this.addRichiestaForm.value.dataCreazione,
     // dataCreazione: new Date(this.addRichiestaForm.value.dataCreazione),
     dataCreazione: this.addRichiestaForm.value.dataCreazione.toISOString(),
      statoApprovazioneConsap:{statoApprovazioneConsapId: this.addRichiestaForm.value.statoApprovazioneConsap,descStatoApprovazioneConsap: null},
      statoRichiestaOs: {statoRichiestaOsId: this.addRichiestaForm.value.statoRichiestaOs, descStatoRichiestaOs:null},
      statoApprovazioneOs: {statoApprovazioneOsId: this.addRichiestaForm.value.statoApprovazioneOs,descStatoApprovazioneOs:null},
      dataStimaFine: this.addRichiestaForm.value.dataStimaFine,
      importo: this.addRichiestaForm.value.importo,
      commessaOs: {commessaOsId:this.addRichiestaForm.value.commessaOs,codiceCommessa:null,descCommessaOs:null}
  
    }
  
    console.log(nuovaRichiesta.applicativo.applicativoId);
    this.parsNumeroTicket = parseInt(nuovaRichiesta.numeroTicket);
      this.parsApplicativo = parseInt(nuovaRichiesta.applicativo.applicativoId);
      this.parsStatoRichiestaConsap = parseInt(nuovaRichiesta.statoRichiestaConsap.statoRichiestaConsapId);
      this.parsStatoApprovazioneConsap = parseInt(nuovaRichiesta.statoApprovazioneConsap.statoApprovazioneConsapId);
      this.parsStatoRichiestaOs = parseInt(nuovaRichiesta.statoRichiestaOs.statoRichiestaOsId);
      this.parsStatoApprovazioneOs = parseInt(nuovaRichiesta.statoApprovazioneOs.statoApprovazioneOsId);
      this.parsCommessaOs = parseInt(nuovaRichiesta.commessaOs.commessaOsId);
      this.parsImporto = parseInt(nuovaRichiesta.importo);
     // this.parsDataCreazione = nuovaRichiesta.dataCreazione.toISOString(); // Converti la data in stringa */


//prendimi il valore del form con id numeroTicket
    const numeroTicket = this.addRichiestaForm.get('numeroTicket')?.value;
    const parsNumeroTicket = parseInt(numeroTicket);

    //prendimi il valore del form con id applicativo
    const applicativo = this.addRichiestaForm.get('applicativo')?.value;
    const parsApplicativo = parseInt(applicativo);

    //prendimi il valore del form con id statoRichiestaConsap
    const statoRichiestaConsap = this.addRichiestaForm.get('statoRichiestaConsap')?.value;
    const parsStatoRichiestaConsap = statoRichiestaConsap===''?null: parseInt(statoRichiestaConsap);

    //prendimi il valore del form con id statoApprovazioneConsap
    const statoApprovazioneConsap = this.addRichiestaForm.get('statoApprovazioneConsap')?.value;
    const parsStatoApprovazioneConsap = statoApprovazioneConsap===''?null: parseInt(statoApprovazioneConsap);

    //prendimi il valore del form con id statoRichiestaOs
    const statoRichiestaOs = this.addRichiestaForm.get('statoRichiestaOs')?.value;
    const parsStatoRichiestaOs = statoRichiestaOs===''?null: parseInt(statoRichiestaOs);

    //prendimi il valore del form con id statoApprovazioneOs
    const statoApprovazioneOs = this.addRichiestaForm.get('statoApprovazioneOs')?.value;
    const parsStatoApprovazioneOs = statoApprovazioneOs===''?null: parseInt(statoApprovazioneOs);

    //prendimi il valore del form con id commessaOs
    const commessaOs = this.addRichiestaForm.get('commessaOs')?.value;
    const parsCommessaOs = parseInt(commessaOs);

    //prendimi il valore del form con id importo
    const importo = this.addRichiestaForm.get('importo')?.value;
   //creami una nuova const e mettimi importo convertito in una stringa
    const importoStringa = importo==='' ? null : importo.toString();

    //prendimi il valore del form con id dataCreazione
    const dataCreazione = this.addRichiestaForm.get('dataCreazione')?.value;
    const dataCreazioneStringa = dataCreazione.toString();

    //prendimi il valore del form con id dataStimaFine
    const dataStimaFine = this.addRichiestaForm.get('dataStimaFine')?.value;
    //se datastimafine è vuota impostamela come null
    const dataStimaFineStringa = dataStimaFine==='' ? null : String(dataStimaFine);
    
    const oggetto = this.addRichiestaForm.get('oggetto')?.value;
    const oggettoStringa= oggetto.toString();
    





    
    
    const dati = {
      erroreDTO: null,
      filtri: null,
      elenco: [{
        numeroTicket:parsNumeroTicket ,
        applicativo: {
            applicativoId: parsApplicativo
        },
        oggetto: oggettoStringa,
         statoRichiestaConsap: {
            statoRichiestaConsapId: parsStatoRichiestaConsap
        },
        dataCreazione: dataCreazioneStringa,
        statoApprovazioneConsap: {
            statoApprovazioneConsapId: parsStatoApprovazioneConsap
        },
        statoApprovazioneOs: {
            statoApprovazioneOsId: parsStatoApprovazioneOs
        },
        statoRichiestaOs: {
            statoRichiestaOsId: parsStatoRichiestaOs
        },
        dataStimaFinale: dataStimaFineStringa,
         importo: importoStringa, 
        commessaOs: {
            commessaOsId: parsCommessaOs
        } 
    }],
    
    
  };
  console.log(dati, 'PARS RICHIESTA');

    

    
    this.chiamateService.createRichiesta(dati).subscribe(data => {
      console.log(data, 'SALVATAGGIO RICHIESTA');
     
    })
   
  } 
  
  


  onSubmit(){
    console.log(this.addRichiestaForm.value.numeroTicket, "numero ticket");
    console.log(this.addRichiestaForm.value.oggetto, "oggetto");
    console.log(this.addRichiestaForm.value.applicativo, "applicativo");
    console.log(this.addRichiestaForm.value, "form");

    this.addRichiesta()
    
    
  }
}
