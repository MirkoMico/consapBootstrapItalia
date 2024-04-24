import { Component, OnInit } from '@angular/core';
import { ChiamateService } from '../../chiamate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-visualizza',
  templateUrl: './visualizza.component.html',
  styleUrl: './visualizza.component.css'
})
export class VisualizzaComponent implements OnInit {
  
  richStorico: any;
  rich:any;
  idRichiesta:any;
  currentPage: any = 1;
  pageSize: any = 5;
  pagineTotali: any=0
  
  constructor(private chiamateService: ChiamateService, private router: Router, private route : ActivatedRoute,
    private http: HttpClient
  ) { }
  ngOnInit(): void {
    const id= localStorage.getItem('idRichiesta');
  this.idRichiesta = id;
  console.log("idRichiesta", id);
  this.prendiRichiesta();


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
  this.chiamateService.richiestaStoricoPost(dati).subscribe((data)=>{
   
    this.richStorico = data.elenco.content;

    const indice = 0/* data.elenco.content.length - 1 */;
    this.pagineTotali = data.elenco.totalPages;
    console.log("richiesta storico indice", indice);
    this.rich = data.elenco.content[indice];
    console.log("richiesta richiesta da visualizzare", this.rich);
    console.log("storico", data.elenco.content);
  },(errore)=>console.log("errore", errore));
  
}
numeroPaginataStorico(pagina:any) {
  //const pagina = 1;
    const urlStorico =`http://localhost:8080/richiesta/storico/${pagina}-${this.pageSize}`;

    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.log("ACCESS TOKEN NON TROVATO");
      
    } 
   /*  const idParsed = parseInt(this.idRichiesta);
    console.log("idRichiesta", idParsed); */
    
    const dati={
      erroreDTO: null,
      filtri:{
        id:this.idRichiesta},
      elenco: null
    
  };
  const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Authorization', `Bearer ${accessToken}`);

return this.http.post<any>(urlStorico, dati, { headers });

  }
  prendiNumeroPagina(event : MouseEvent) {
    const target = event.target as HTMLElement;
    const valueText = target?.textContent || '';
    const currentPageSelezionato = parseInt(valueText.split('/')[0].trim(), 10);
    console.log("Dimensione pagina:", currentPageSelezionato);
   
    this.currentPage = currentPageSelezionato;
   
   this.numeroPaginataStorico(currentPageSelezionato).subscribe(data => {
      this.richStorico = data.elenco.content;
      console.log("-------ELENCO RICHIESTE-------", data.elenco.content);
      this.pagineTotali = data.elenco.totalPages;
      console.log("-------TOTAL PAGES-------", this.pagineTotali);
      
    }) 
  }  
  paginaSuccessiva() {
    console.log("ho clicc pag successiva");
    
    if (this.currentPage < this.pagineTotali) {
      let currentPageCopy = this.currentPage;
      currentPageCopy++;
      this.numeroPaginataStorico(currentPageCopy).subscribe(data => {
        this.currentPage = currentPageCopy;
        this.richStorico = data.elenco.content;
        console.log("pag corrente", this.currentPage);
        this.pagineTotali = data.elenco.totalPages;
        console.log("-------TOTAL PAGES-------", this.pagineTotali);
      });
      console.log("CURRENT PAGE", this.currentPage);
    }
  }
  paginaPrecedente() {
    if (this.currentPage > 1) {
     let currentPageCopy = this.currentPage;
      currentPageCopy--;
      
      this.numeroPaginataStorico(currentPageCopy).subscribe(data => {
        this.currentPage = currentPageCopy;
        this.richStorico = data.elenco.content;
        console.log("-------ELENCO RICHIESTE-------", data.elenco.content);
        this.pagineTotali = data.elenco.totalPages;
        console.log("-------TOTAL PAGES-------", this.pagineTotali);
        
      })
      ;
      console.log("CURRENT PAGE", this.currentPage);
      
    }
  }
  


  visualizzaSingola(elementoDaVisualizzare: any) {
    
    
      // Supponiamo che tu voglia stampare la posizione dell'elemento this.elementoDaVisualizzare
      const indice = this.richStorico.indexOf(elementoDaVisualizzare);
      console.log("Posizione nell'array:", indice);

      //prendimi l'elemento da visualizzare con questo indice e visualizzalo nel form
      this.rich = this.richStorico[indice];
    
  }

}
