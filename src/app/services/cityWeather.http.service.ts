import  {Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CityWeatherHttpService {
  constructor(private http: HttpClient) {}

  public city: string;
  onClick: EventEmitter<any> = new EventEmitter();

  getCityName(city) {
    this.city = city;
    this.getCityWeather(city);
    this.onClick.emit(this.city);

  }

  getCityWeather(city) {
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&mode=xml&appid=65e8afce4690b284b3c577d30244721e`,
      {responseType: 'text'});
  }
}
