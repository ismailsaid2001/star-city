import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Signin } from './signin.interface';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  signinData!: Signin
  errorMessageEmail: string = 'Veuillez saisir votre email'
  errorMessagePassword: string = 'Veuillez saisir votre mot de passe'
  isVisibleModal: boolean = false;
  email?: string

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private router: Router,
    private msg: NzMessageService,
  ) { }

  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      this.signinData = this.validateForm.value
      this.authService.signin(this.signinData)
      .subscribe((response) => {
        if (response.status === 401) {
          this.errorMessagePassword = 'Mot de passe incorrect'
          const passwordControl = this.validateForm.get('password'); 
          if (passwordControl) {
            passwordControl.setErrors({ 'incorrect': true }); 
          }
        } else if (response.status === 404) {
          this.errorMessageEmail = 'Adresse email inconnue'
          const emailControl = this.validateForm.get('email'); 
          if (emailControl) {
            emailControl.setErrors({ 'incorrect': true }); 
          }
        } else if (response.status === 201) {
          this.msg.success(`Connexion réussie !`);
          localStorage.setItem('token', response.token) 
          this.router.navigate(['/welcome-page'])
        }
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  closeModal(): void {
    this.isVisibleModal = false;
  }

  getEmail() {
    this.email = this.validateForm.value.email 
    this.isVisibleModal = true;
  }


}
