import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChiamateService } from '../../chiamate.service';

@Component({
  selector: 'app-modifica',
  templateUrl: './modifica.component.html',
  styleUrl: './modifica.component.css'
})
export class ModificaComponent implements OnInit {
  constructor( private chiamateService: ChiamateService, private router: Router, private route : ActivatedRoute) { }
rich:any
idRichiesta:any;



statoRichiestaConsap: any = [];
statoRichiestaConsapBox!: any
statoRichiestaOs: any = [];
statoApprovazioneConsap: any = [];
statoApprovazioneOs: any = [];
statoApprovazioneOsBox: any 
commessaOs: any = [];


  ngOnInit(): void {
  const id= localStorage.getItem('idRichiesta');
  this.idRichiesta = id;
  console.log("idRichiesta", id);
  this.prendiRichiesta();

  this.statoRichiestaConsapPost(); 
    this.statoRichiestaOsPost();
    this.statoApprovazioneConsapPost();
     this.statoApprovazioneOsPost(); 
    this.commessaOsPost();
   /*  console.log("statoRichiestaConsap", this.statoRichiestaConsapPost()); */
    
    }
    prendiRichiesta() {
      const idParsed = parseInt(this.idRichiesta);
      console.log("idRichiesta", idParsed);

      const dati={
        erroreDTO: null,
        filtri:{
          id: idParsed},
        elenco: null
      
    };
    console.log("dati", dati);
    this.chiamateService.richiestaSingolaPost(dati).subscribe((data)=>{
     const indice=0;
      this.rich = data.elenco.content[indice];
      console.log("richiesta da modificare", this.rich);

    



    },(errore)=>console.log("errore", errore));


   

   
    
  
}

    modificaRichiesta() {
      //console.log("modificaRichiesta", this.rich.id);

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
        filtri:{
          id: this.rich.id},
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
      this.chiamateService.modificaRichiestePost(dati).subscribe((data) => {
        console.log("Modifica SALVATA:",data);
        
      }, (error) => {
        console.error(error);
      })
     
    

      
     
        
     
      
    }

     statoRichiestaConsapPost(){
      this.chiamateService.statoRichiestaConsapPost().subscribe(data => {
        this.statoRichiestaConsap = data.elenco;
        console.log(data.elenco);
        console.log("statoRichiestaConsap", this.statoRichiestaConsap);

       /*  //se il valore è null mintro l'array vuoto
        if(this.statoRichiestaConsap === null){
          this.statoRichiestaConsap = [0];
        }
 */

        
      })
    } 
  
    statoRichiestaOsPost(){
      this.chiamateService.statoRichiestaOsPost().subscribe(data => {
        this.statoRichiestaOs = data.elenco;
        console.log(data.elenco);

      /*    //se il valore è null mintro l'array vuoto
         if(this.statoRichiestaOs === null){
          this.statoRichiestaOs = [0];
          console.log("statoRichiestaOs", this.statoRichiestaOs);
          
        } */

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

    openModal() {
      const modal=document.getElementById('modal1');
      if(modal){
        modal.classList.add('show');
        modal.style.display = 'block';
      }
    }

    chiudiModal(){
      const modal =document.getElementById('modal1');
      if(modal){
        modal.classList.remove('show');
        modal.style.display = 'none';
      }
    }
    refreshPage(){
      window.location.reload();
    }
    





}