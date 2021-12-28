import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as itemsActions  from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription = new Subscription();
  ingresoSubs: Subscription = new Subscription();

  constructor(private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(({user}) => {
        console.log(user);
        this.ingresoSubs = this.ingresoEgresoService.initIngresosEgresosListener( user?.uid )
          .subscribe( (ingresoEgresoFB: IngresoEgreso[]) => {
            this.store.dispatch(itemsActions.setItems({items: ingresoEgresoFB}))
          })
      });
  }

  ngOnDestroy(): void {
      this.userSubs?.unsubscribe();
      this.ingresoSubs?.unsubscribe();
  }

}
