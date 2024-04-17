import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ChiamateService } from '../../chiamate.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',

  styleUrl: './login.component.css',
})
export class LoginComponent {
  showPassword: boolean = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  useForm: FormGroup;

 /*  showError: boolean = false;
  isButtonDisabled: boolean = false;
  username: string = '';
  password: string = ''; */

  constructor(
    private chiamateService: ChiamateService,
    private router: Router,
    private authService: AuthService
  ) {
    this.useForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

    onSubmit() {
      const data = {
        username: this.useForm.get('username')?.value,
        password: this.useForm.get('password')?.value,
      };
if (this.useForm.valid) {
      this.chiamateService.loginPost(data).subscribe(
        (response) => {
          console.log('login effettuato');
         /*  this.authService.setAuthenticated(); */
         const accessToken = response.headers.get('access_token');
         this.authService.setAuthToken(accessToken);
          this.router.navigate(['/elenco']);
        },
      
        (error) => {
          console.log(error);
          /* this.showError(error); */
        }
        
      );

      }

    //console.log(this.useForm.value);
  } 

  
}
