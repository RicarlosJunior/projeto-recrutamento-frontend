import { bootstrapApplication } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { appConfig } from './app/app.config'; // Importando a configuração
import { AppComponent } from './app/app.component';
import { AuthInterceptor } from './app/auth/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    HttpClientModule, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    ...appConfig.providers, 
  ]
})
  .catch((err) => console.error(err));
