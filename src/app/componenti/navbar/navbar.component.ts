import { Component } from '@angular/core';

import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
 
  constructor(private router: Router ) {}
  
  showModal: boolean = false;

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

}
