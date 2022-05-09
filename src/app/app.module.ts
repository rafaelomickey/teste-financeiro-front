import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ClienteModule } from './cliente/cliente.module';
import { HeaderComponent } from './header/header.component';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found/not-found.component';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePt)
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClienteModule
  ],
  providers: [
    {
      provide: LOCALE_ID, 
      useValue: "pt-BR"
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
