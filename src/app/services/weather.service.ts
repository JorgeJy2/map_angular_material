import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

 

  constructor(private http: HttpClient ) {
  }

  getWeather(lag: number, lng: number) {
    const apikeyWeather = ''; //Tu apikeyt aquí
    //https://openweathermap.org/api

    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${
      lag}&lon=${
        lng
      }&appid=${apikeyWeather}&units=metric`);
  }

}
