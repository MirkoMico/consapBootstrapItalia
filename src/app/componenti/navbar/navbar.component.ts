import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import test from 'node:test';
import { text } from 'stream/consumers';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
 
  constructor(private router: Router,private jwtHelper: JwtHelperService ) {}
  ngOnInit(): void {
    
   
  }
  
  showModal: boolean = false;
  showErrorCerca:boolean = false;

  searchText: string = ''; // Variabile per memorizzare il testo della ricerca
  isInputVisible: boolean = false; // Variabile per controllare lo stato di visibilità dell'input
  // Definisci una variabile per memorizzare l'utente attualmente connesso
currentUser: string = 'Rossi'; // Supponiamo che "Rossi" sia l'utente predefinito

  


  userName: string | null = null;


  openModal() {
    this.showModal = true;
  }
  logout() {
    // Rimuovi l'access_token dal localStorage
    localStorage.removeItem('access_token');

    // Reindirizza l'utente alla pagina di login
    this.router.navigate(['/home']);
  }

  cancelLogout() {
    this.showModal = false;
  }
 search(): void {
    console.log('Searching for:', this.searchText);
    
    // Implementa la logica di reindirizzamento in base al testo di ricerca inserito dall'utente
    switch (this.searchText.toLowerCase()) {
      case 'inserimento':
        this.router.navigate(['/inserimento']); // Reindirizza l'utente alla pagina di inserimento
        break;
      case 'elenco':
        this.router.navigate(['/elenco']); // Reindirizza l'utente alla pagina di elenco
        break;
      case 'home': 
        this.router.navigate(['/homeaccesso']); // Reindirizza l'utente alla pagina di homeaccesso
        break;
      // Aggiungi altri casi per altri testi di ricerca e relative pagine
      default:
        console.log('Nessuna corrispondenza trovata per:', this.searchText);
        alert('Nessuna corrispondenza trovata per: ' + this.searchText);
        break;
  }
}

  toggleSearch(): void {
    this.isInputVisible = !this.isInputVisible; // Inverti lo stato di visibilità dell'input di ricerca
    if (!this.isInputVisible) {
      this.searchText = ''; // Pulisci il testo di ricerca quando l'input viene nascosto
    }
  }

  checkCerca(event: any) {
    const inputText = event.target.value;
    this.showErrorCerca = inputText === '' || inputText !== '';

    
  }

 // Metodo per cambiare l'utente
changeUser(user: string) {
  this.currentUser = user;
}




}
