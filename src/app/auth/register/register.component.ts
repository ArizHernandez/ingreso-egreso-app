import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = <any>0;

  constructor( private fb:FormBuilder,
               private authService:AuthService,
               private router:Router ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      user: ['', [Validators.required]],
      email: ['', [ Validators.required, Validators.email, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  get userValid(){ return this.registerForm.controls.user.valid }
  get emailValid(){ return this.registerForm.controls.email.valid }
  get passwordValid(){ return this.registerForm.controls.password.valid }

  createUser(){
    if(this.registerForm.valid){
      const { user, email, password } = this.registerForm.value;

      Swal.fire({
        title: 'Loading',
        text: 'Please wait...',
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        }
      });

      this.authService.createUser(user, email, password)
        .then( newUser => this.router.navigateByUrl('/dashboard'))
        .catch( err => Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
         }))
         .finally( () => Swal.close() );
    }
  }

}
