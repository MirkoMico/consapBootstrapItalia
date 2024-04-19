import { Component, OnInit } from '@angular/core';
import { ChiamateService } from '../../chiamate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-visualizza',
  templateUrl: './visualizza.component.html',
  styleUrl: './visualizza.component.css'
})
export class VisualizzaComponent implements OnInit {
  constructor(private chiamateService: ChiamateService, private router: Router, private route : ActivatedRoute) { }

  richStorico: any;
  rich:any;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.rich = JSON.parse(params['pippo']);
      console.log(this.rich.id, "richiesta");

      
      
      }); 
     

    this.richiesteStorico();


  }

  richiesteStorico(){
    const id = this.rich.id;
      const idPars= parseInt(id);
      
    this.chiamateService.richiestaStoricoPost(idPars).subscribe(data => {
      this.richStorico = data.elenco.content;
      console.log("storico", data.elenco.content);
    })
  }

  visualizzaSingola(elementoDaVisualizzare: any) {
    
    
      // Supponiamo che tu voglia stampare la posizione dell'elemento this.elementoDaVisualizzare
      const indice = this.richStorico.indexOf(elementoDaVisualizzare);
      console.log("Posizione nell'array:", indice);

      //prendimi l'elemento da visualizzare con questo indice e visualizzalo nel form
      this.router.navigate(['/visualizza'], { queryParams: { pippo: JSON.stringify(this.richStorico[indice]) } });

    
    

    
  }

}
