import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import * as uiActions from '../shared/ui.actions';
import { stopLoading } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  tipo: string = 'ingreso';
  cargando: boolean = false;
  loadingSubscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private ingresoEgresoService: IngresoEgresoService,
              private store: Store<AppState>) {
    this.ingresoForm = fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.loadingSubscription = this.store.select('ui').subscribe( ui =>{
      this.cargando = ui.isLoading;
    })
  }
  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  guardar(){
    
    this.store.dispatch( uiActions.isLoading() );
    

    if(this.ingresoForm.invalid) return;
    const {descripcion, monto} = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
    console.log(ingresoEgreso);
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then( ()=> {
        Swal.fire('Registro creado', descripcion, 'success');
        this.ingresoForm.reset();
        this.store.dispatch( uiActions.stopLoading() );
      })
      .catch( err => {
        Swal.fire('Error', err.message, 'error')
        this.store.dispatch( uiActions.stopLoading() );
      });
    

  }

}
