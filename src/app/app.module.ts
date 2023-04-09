import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ActorsComponent } from './pages/actors/actors.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,

    // Wip
    ActorsComponent,
    CompaniesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
