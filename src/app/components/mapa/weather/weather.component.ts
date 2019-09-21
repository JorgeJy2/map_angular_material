import { Component, OnInit,Inject } from '@angular/core';
import { MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { MapaComponent } from '../mapa.component';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { Marcador } from 'src/app/classes/marcador.class';

import {  WeatherService } from '../../../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  public marcador: Marcador;
  public loading = true;

  public infoweather: Infoweather;

  constructor(
    private serviceWeather: WeatherService,
    private bottomSheetRef: MatBottomSheetRef<MapaComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { 
    this.marcador = data.marcador;
    console.log(this.marcador);
    serviceWeather.getWeather(this.marcador.lat, this.marcador.lng).subscribe(
      (response: any ) => {
        this.loading = false;
        console.log(response);
        this.infoweather = {
          name : response.name,
          country : response.sys.country,
          humidity : response.main.humidity,
          pressure : response.main.pressure,
          temp : response.main.temp,
          temp_max : response.main.temp_max,
          temp_min : response.main.temp_min,
        };
        console.log(this.infoweather);
      }
    );
  }

  ngOnInit() {
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

}

interface Infoweather {
  country: string;
  name: string;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}
