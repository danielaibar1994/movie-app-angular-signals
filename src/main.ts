import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./app/app-routes')
        .then(m => m.APP_ROUTES)
  },
]

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes)
  ]
})
  .catch(err => console.error(err));

  // provideHttpClient(withInterceptors([httpInterceptor])),