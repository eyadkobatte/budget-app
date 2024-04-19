import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { addJwtInterceptor } from '../shared/interceptors/add-jwt/add-jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideRouter(appRoutes),
    provideHttpClient(withFetch(), withInterceptors([addJwtInterceptor])),
    provideAnimationsAsync(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'budget-app-86af2',
          appId: '1:30123809038:web:f87e0a88a2226493c65f5f',
          storageBucket: 'budget-app-86af2.appspot.com',
          apiKey: 'AIzaSyDxD-hY8H_zLTGNOHlfd8AKmgudIOh-SlI',
          authDomain: 'budget-app-86af2.firebaseapp.com',
          messagingSenderId: '30123809038',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
  ],
};
