import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Richieste } from './richieste';
import { AuthService } from './auth/auth.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})


export class ChiamateService {
  constructor(private http: HttpClient,private authService: AuthService) { }

  currentPage: number = 1; // Imposta il valore iniziale della pagina corrente
  pageSize: number = 5; // Imposta il valore iniziale della dimensione della pagina
  nuovaRichiesta!: Richieste;

  addRichiestaForm!: FormGroup;

  private urlLogin = 'http://localhost:8080/login';
  private urlRichieste = `http://localhost:8080/richiesta/${this.currentPage}-${this.pageSize}`;
  private urlApplicativo = 'http://localhost:8080/applicativo';
  private urlStatoRichiestaConsap = 'http://localhost:8080/statoRichiestaConsap';
  private urlStatoRichiestaOs='http://localhost:8080/statoRichiestaOs';
  private urlStatoApprovazioneOs = 'http://localhost:8080/statoApprovazioneOs';
  private urlStatoApprovazioneConsap = 'http://localhost:8080/approvazioneConsap';
  private urlCommesse = 'http://localhost:8080/commessaOs';
  private urlcreateRichiesta = 'http://localhost:8080/richiesta/new';

  loginPost(data: any):Observable<any>{
    return this.http.post<any>(this.urlLogin, data,{observe: 'response'}).pipe(
        tap((response) => {
            const headers= response.headers;
            const accessToken =headers.get('access_token');
            if (accessToken) {
              
              localStorage.setItem('access_token', accessToken);
              console.log('access_token salvato nel localStorage', accessToken);
            }else{
              console.log('access_token non trovato');
            }
        })
    );
  }


   richiestePost(): Observable<any> {
    // Verifica se c'è un access_token nel localStorage
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.error('Access token non trovato nel localStorage.');
      //return; // Interrompe l'esecuzione del metodo se l'access_token non è presente
    }


   // const url = `http://localhost:8080/richiesta/${this.currentPage}-${this.pageSize}`;
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
        elenco: null,
      
    };
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${accessToken}`);

   return this.http.post<any>(this.urlRichieste, body, { headers });
  }

private chiamatePost(url: string): Observable<any> {
  // Verifica se c'è un access_token nel localStorage
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    console.error('Access token non trovato nel localStorage.');
    //return; // Interrompe l'esecuzione del metodo se l'access_token non è presente
  }
  const body = {
    erroreDTO: null,
    filtri: {
      "id": null,
      "descrizione": null
     
    },
    elenco: null,
  
};
const headers = new HttpHeaders()
.set('Content-Type', 'application/json')
.set('Authorization', `Bearer ${accessToken}`);

return this.http.post<any>(url, body, { headers });
}

applicativoPost(): Observable<any> {
  return this.chiamatePost(this.urlApplicativo);
}
statoRichiestaConsapPost(): Observable<any> {
  return this.chiamatePost(this.urlStatoRichiestaConsap);
}
statoRichiestaOsPost(): Observable<any> {
  return this.chiamatePost(this.urlStatoRichiestaOs);
}
statoApprovazioneConsapPost(): Observable<any> {
  return this.chiamatePost(this.urlStatoApprovazioneConsap);
}
statoApprovazioneOsPost(): Observable<any> {
  return this.chiamatePost(this.urlStatoApprovazioneOs);
}
commessaOsPost(): Observable<any> {
  return this.chiamatePost(this.urlCommesse);
}


createRichiesta(dati: any)  {

  // Verifica se c'è un access_token nel localStorage
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    console.error('Access token non trovato nel localStorage.');
    //return; // Interrompe l'esecuzione del metodo se l'access_token non è presente
  }


 
  const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Authorization', `Bearer ${accessToken}`);

 return this.http.post<any>(this.urlcreateRichiesta, dati, { headers }); 
}


richiestaSingolaPost(dati: any)  {
  // Verifica se c'è un access_token nel localStorage
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    console.error('Access token non trovato nel localStorage.');
    //return; // Interrompe l'esecuzione del metodo se l'access_token non è presente
  }


 
  const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Authorization', `Bearer ${accessToken}`);

 return this.http.post<any>(this.urlRichieste,dati , { headers });
}











}



