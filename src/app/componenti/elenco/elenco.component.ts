import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChiamateService } from '../../chiamate.service';
import { Richieste } from '../../richieste';

@Component({
  selector: 'app-elenco',
  templateUrl: './elenco.component.html',
  styleUrl: './elenco.component.css'
})


export class ElencoComponent implements OnInit {
loading = true;
showSpinner = true;
richieste: Richieste[] = [];
  constructor(private chiamateService: ChiamateService, private router: Router) {}

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      this.loading=false;
      this.showSpinner = false;
      document.body.style.overflow = 'auto';
    }, 2000);


    this.richiestePost();

    // Chiamata richiestePost quando il componente viene inizializzato

    
    
    
  }

  richiestePost(){
    this.chiamateService.richiestePost().subscribe(data => {
      this.richieste = data.elenco.content;
      console.log("-------ELENCO RICHIESTE-------", data.elenco.content);
      
    })
  }

  redirect(richiesta:any){
    console.log(JSON.stringify(richiesta)+"invio?")
    console.log("CI SONO")
    this.router.navigate(["/visualizza"],{queryParams:{pippo : JSON.stringify(richiesta)}});
  } 
  

}
