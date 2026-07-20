import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { routes } from './app.routes';
import localeRU from '@angular/common/locales/ru'; // импорт рус. яз.

registerLocaleData(localeRU); // регистрация локаль
 
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {provide: LOCALE_ID, useValue:'ru-RU'} // для пайпов дефолт рус. яз
  ]
};
