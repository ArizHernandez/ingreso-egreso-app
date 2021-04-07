import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup = <any>0;

  constructor(private fb:FormBuilder,
              private authService:AuthService,
              private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [ Validators.required, Validators.email, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ]],
      password: ['', [ Validators.required, Validators.minLength(3) ] ]
    });
  }

  get emailValid(){
    return this.loginForm.controls.email.valid;
  }

  get passwordValid(){
    return this.loginForm.controls.password.valid;
  }

  logIn(){
    if( this.loginForm.valid ){
      const { email, password } = this.loginForm.value; 

        Swal.fire({
          icon: 'info',
          title: 'Loading',
          text: 'Please Wait...',
          showConfirmButton: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          }
        })
      
      this.authService.logIn(email, password)
        .then( login => {
          this.router.navigateByUrl('/dashboard');
        })
        .catch( err => Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message  
         }))
        .finally( () => Swal.close() );
    }
  }

}
