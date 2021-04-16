import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from '../../shared/ui.actions';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm:FormGroup = <any>0;
  isLoading:boolean = false;
  uiSubscription:Subscription = new Subscription;

  constructor(private fb:FormBuilder,
              private authService:AuthService,
              private store:Store<AppState>,
              private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [ Validators.required, Validators.email, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ]],
      password: ['', [ Validators.required, Validators.minLength(6) ] ]
    });

    this.uiSubscription = this.store.select('ui').subscribe( ui => this.isLoading = ui.isLoading);
  }

  ngOnDestroy(): void{
    this.uiSubscription.unsubscribe();
  }

  get emailValid(){
    return this.loginForm.controls.email.valid;
  }

  get passwordValid(){
    return this.loginForm.controls.password.valid;
  }

  logIn(){
    if( this.loginForm.invalid ){ return; }
    
    this.store.dispatch( ui.isLoadingAction() );
    
    const { email, password } = this.loginForm.value; 
    
    this.authService.logIn(email, password)
    .then( login => {
      this.router.navigateByUrl('/dashboard');
      })
      .catch( err => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message  
        }))
      .finally( () => {
        this.store.dispatch( ui.stopLoadingAction() );
        Swal.close()
      });
    
  }

}
