import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: null
    })
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
