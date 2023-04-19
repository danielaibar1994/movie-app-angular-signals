import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HttpClientModule, RouterOutlet, NavbarComponent],
})
export class AppComponent {
  title = 'movie-app-angular-signals';
}
// bootstrapApplication(AppComponent, {
//   providers: [provideRouter(APP_ROUTES)],
// });

// {provide:AppService,useClass:AppService},
// {provide:BACKEND_URL,useValue:"abc.com"},
