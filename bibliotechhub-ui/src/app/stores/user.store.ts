
import { Injectable } from '@angular/core';
import { tap, map, flatMap } from 'rxjs/operators';
import { from } from 'rxjs';

import { KeycloakService } from 'keycloak-angular';

import { Store } from './store';
import { UserInfo } from '../models/UserInfo';

@Injectable({
  providedIn: 'root'
})
export class UserStore extends Store<UserInfo> {
  constructor(
      private keycloakService: KeycloakService,
      ) {
    super();
  }

  init = (): void => {
    if (this.getAll()) { return; }

    if (this.keycloakService.isLoggedIn()) {
        from(this.keycloakService.loadUserProfile()).pipe(
            tap(this.store),
            map(() => {
                this.getAll().isLoggedIn = true;
                this.getAll().isAdministrator = this.keycloakService.isUserInRole("admin");
            })
        ).subscribe();
    }
  }

  logout = async (): Promise<void> => {
    await this.keycloakService.logout();
    this.store(undefined);
  }

  login(): void {
    this.keycloakService.login();
    this.init();
  }

 

}
