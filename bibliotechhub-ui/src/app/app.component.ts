import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserInfo } from './models/UserInfo';
import { UserStore } from './stores/user.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    .count {
      padding: 2px 3px;
      z-index:15;
      position:relative; 
      left: -10px; 
      top:-10px
    }
  `]
})
export class AppComponent implements OnInit {

  isCollapsed = true;
  user$: Observable<UserInfo>;
  
  constructor(
    private router: Router, 
    private userStore: UserStore) {
      this.userStore.init();
    }

  ngOnInit() {
    this.user$ = this.userStore.getAll$();
  }
  
  doLogin(): void {
    this.userStore.login();
  }

  
  async doLogout() {
    await this.router.navigate(['/']);
    await this.userStore.logout();
  }

}
