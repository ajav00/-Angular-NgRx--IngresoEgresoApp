import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2'
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm:FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
              private store: Store<AppState>) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
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

  crearUsuario(){
    if(this.registerForm.invalid) return;
    const {nombre, correo, password} = this.registerForm.value;
    this.store.dispatch( ui.isLoading() )

    // Swal.fire({
    //   title: 'Espere por favor',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   }
    // })
    this.authService.crearUsuario(nombre, correo, password)
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
      });
  }

}
