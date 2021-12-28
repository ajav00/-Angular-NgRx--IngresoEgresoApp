import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresoEgreso: IngresoEgreso[] = [];
  ingresoSubs: Subscription = new Subscription();

  constructor(private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.ingresoSubs = this.store.select('ingresosEgresos').subscribe(({items})=> this.ingresoEgreso = items);
  }

  ngOnDestroy(): void {
      this.ingresoSubs.unsubscribe();
  }

  borrar(uid: string | undefined){
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
      .then( () => Swal.fire('Borrado', 'Item Borrado', 'success') )
      .catch( (err) => Swal.fire('Error', err.message, 'error') )

  }

}
