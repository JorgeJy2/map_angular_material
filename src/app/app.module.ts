import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from './material.module';
import { MapaComponent } from './components/mapa/mapa.component';

import { AgmCoreModule } from '@agm/core';
import { MapaEditarComponent } from './components/mapa/mapa-editar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WeatherComponent } from './components/mapa/weather/weather.component';


import { HttpClientModule } from '@angular/common/http';

@NgModule({
  entryComponents: [
    MapaEditarComponent,
    WeatherComponent
  ],
  declarations: [
    AppComponent,
    MapaComponent,
    MapaEditarComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: '' //Tu api key
      //https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
