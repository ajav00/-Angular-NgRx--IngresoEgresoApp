import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

// NgRx
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm:FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
              private store: Store<AppState>) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })  
  }
  
  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
      // console.log('Cargando Subs');
    });
  }

  ngOnDestroy(): void {
      this.uiSubscription.unsubscribe();
  }

  loginUser(){
    if(this.loginForm.invalid) return;
    const {correo, password} = this.loginForm.value;


    this.store.dispatch( ui.isLoading() )

    // Swal.fire({
    //   title: 'Espere por favor',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   }
    // })

    this.authService.loginUsuario(correo, password)
      .then((credenciales: any) => {
        console.log(credenciales);
        // Swal.close();
        this.store.dispatch( ui.stopLoading() );
        this.router.navigate(['/']);
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: err.message
        })
      })
  }

}
