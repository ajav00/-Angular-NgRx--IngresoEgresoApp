import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


// Firebase
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { DashboardComponent } from './dashboard/dashboard.component';
// import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
// import { EstadisticaComponent } from './ingreso-egreso/estadistica/estadistica.component';
// import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';


// import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment.prod';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { OrdenIngresoPipe } from './pipes/orden-ingreso.pipe';
// import { NgChartsModule } from 'ng2-charts';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
