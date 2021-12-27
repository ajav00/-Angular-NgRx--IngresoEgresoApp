import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from '../../app.reducer';
import * as authActions from '../../auth/auth.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, 
              private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  logout(){
    this.auth.logout().then(()=>{
      this.store.dispatch(authActions.unsetUser());
      this.router.navigate(['/login']);
    });
  }

}
