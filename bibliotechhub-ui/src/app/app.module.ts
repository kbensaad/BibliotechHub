import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CollapseModule, TooltipModule, ModalModule, BsDropdownModule } from 'ngx-bootstrap';

import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TwoDigitDecimalNumberDirective } from './directives/two-digit-decimal-number.directive';
import { HttpErrorInterceptor} from './interceptor/http-error.interceptor';

import { AlertComponent } from './components/alert/alert.component';
import { BookCategoryComponent } from './components/book-category/book-category.component';
import { BookComponent } from './components/book/book.component';
import { UserStore } from './stores/user.store';

export function kcInitializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: environment.keycloak,
          initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: false
          },
          enableBearerInterceptor: true
        });
        resolve();
      } catch (error) {
        console.log("Error thrown in init "+error);
        reject(error);
      }
    });
  };            
}

@NgModule({
  declarations: [
    AppComponent,   
    TwoDigitDecimalNumberDirective,
    AlertComponent,
    BookCategoryComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    KeycloakAngularModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [
    DatePipe,
    UserStore,
    { provide: APP_INITIALIZER, useFactory: kcInitializer, multi: true, deps: [KeycloakService] },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
