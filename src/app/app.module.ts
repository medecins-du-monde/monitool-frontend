import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './components/header/header.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoginModule } from './components/login/login.module';
import { MsalBroadcastService, MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent, MsalService } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomHttpInterceptor } from './interceptors/http-interceptor';
import { LoadingBarModule } from './components/loading-bar/loading-bar.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { RefreshSnackbarModule } from './components/refresh-snackbar/refresh-snackbar.module';
import { UserRightsTableModule } from './components/user-rights-table/user-rights-table.module';
import { RefreshModalModule } from './components/refresh-modal/refresh-modal.module';
import { InteractionType, PublicClientApplication, BrowserCacheLocation, LogLevel } from '@azure/msal-browser';
import { QuillModule } from 'ngx-quill';
import { DataFlowStylePipe } from './pipes/DataFlowStyle/data-flow-style.pipe';


const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
export function loggerCallback(logLevel, message) {
  console.log(message);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    LoadingBarModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    LoginModule,
    NoopAnimationsModule,
    MatSnackBarModule,
    RefreshSnackbarModule,
    RefreshModalModule,
    UserRightsTableModule,
    QuillModule.forRoot(),
    MsalModule.forRoot( new PublicClientApplication({
      auth: {
        clientId: environment.clientId, // This is your client ID
        authority: environment.authority, // This is your tenant ID
        redirectUri: environment.redirectUrl, // This is your redirect URI
        postLogoutRedirectUri: environment.postLogoutRedirectUri,
        navigateToLoginRequestUrl: true
      },
      cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage,
        storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
      },
      system: {
          loggerOptions: {
            loggerCallback,
            piiLoggingEnabled: true,
            logLevel: LogLevel.Info
          }
      }
    }), {
        interactionType: InteractionType.Redirect, // MSAL Guard Configuration
        authRequest: {
          scopes: [
            'user.read',
            'openid',
            'profile',
          ]
        },
        loginFailedRoute: '/login'
    }, {
      interactionType: InteractionType.Redirect, // MSAL Guard Configuration
      protectedResourceMap: new Map([['https://graph.microsoft.com/v1.0/me', ['user.read']]])

    }),
    // Enabled in every environments
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: true })
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE, useValue: 'en'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
