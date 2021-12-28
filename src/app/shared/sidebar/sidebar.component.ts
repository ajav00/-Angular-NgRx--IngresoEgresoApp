import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from '../../app.reducer';
import * as authActions from '../../auth/auth.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre: string | undefined  = '';
  userSubs: Subscription = new Subscription();

  constructor(private auth: AuthService, private router: Router, 
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
                      .pipe(
                        filter( ({user}) => user != null )
                      )
                      .subscribe( ({ user }) => this.nombre = user?.nombre );
  }

  ngOnDestroy(): void {
      this.userSubs.unsubscribe();
  }

  logout(){
    this.auth.logout().then(()=>{
      this.store.dispatch(authActions.unsetUser());
      this.router.navigate(['/login']);
    });
  }

}
