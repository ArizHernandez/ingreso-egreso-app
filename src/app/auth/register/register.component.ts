import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from '../../shared/ui.actions';

import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm:FormGroup = <any>0;
  uiSubscription:Subscription = <any>0;
  isLoading:boolean = false; 

  constructor( private fb:FormBuilder,
               private authService:AuthService,
               private store:Store<AppState>,
               private router:Router ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      user: ['', [Validators.required]],
      email: ['', [ Validators.required, Validators.email, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.uiSubscription = this.store.select('ui').subscribe( ui => this.isLoading = ui.isLoading );
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  get userValid(){ return this.registerForm.controls.user.valid }
  get emailValid(){ return this.registerForm.controls.email.valid }
  get passwordValid(){ return this.registerForm.controls.password.valid }

  createUser(){
    if(this.registerForm.invalid){ return; }

    const { user, email, password } = this.registerForm.value;

    this.store.dispatch( ui.isLoadingAction() );

    this.authService.createUser(user, email, password)
      .then( () => this.router.navigateByUrl('/dashboard'))
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
