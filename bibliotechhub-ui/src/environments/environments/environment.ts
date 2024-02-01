// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { KeycloakService, KeycloakOptions } from 'keycloak-angular';

const keycloakOptions: KeycloakOptions = {
  config: {
    url: 'http://localhost:8080/auth',
    realm: 'demo',
    clientId: 'my-app'
  },
  initOptions: {
    onLoad: 'login-required',
    checkLoginIframe: false
  },
  enableBearerInterceptor: true,
  bearerPrefix: 'Bearer',
};

export const environment = {
  production: false,
  keycloakOptions,
  keycloakAngular: KeycloakService,
};
