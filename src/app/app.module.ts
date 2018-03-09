import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormControlDirective, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { 
  MatInputModule,
  MatAutocompleteModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core'

import { MainService } from './services/main.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: null
    }),
    MatInputModule,
    MatAutocompleteModule
  ],
  providers: [MainService, FormControlDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
