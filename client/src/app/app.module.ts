import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeader } from './components/header/AppHeader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppForm } from './components/form/AppForm';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppHeader,
    AppForm,
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
