import { Component, AfterViewInit } from '@angular/core';
import { CityWeatherHttpService } from '../services/cityWeather.http.service';
import * as xml2js from 'xml2js';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.scss']
})
export class WeatherInfoComponent implements AfterViewInit {
  // @ts-ignore
  public parser = new xml2js.Parser({explicitArray : false});
  public response: any;
  array: Array<any> = [];

  constructor(private weatherService: CityWeatherHttpService, private storage: StorageMap) {
    this.weatherService.onClick.subscribe(
      city => {
        this.storage.get(city).subscribe((weather) => {
          if (!weather) {
            this.weatherService.getCityWeather(city).subscribe(
              weatherInfo => {
                let self = this;

                this.parser.parseString(weatherInfo,function(err,result){
                  self.response = result;
                });

              },
              error => console.log(error)
            )
            this.storage.set(this.weatherService.city, this.response).subscribe(() => {});
          } else {
            this.storage.get(city).subscribe((weather) => {
              this.response = weather;
            })
          }
        });
      }
    )
  }



  ngAfterViewInit() {

    this.weatherService.getCityWeather(this.weatherService.city).subscribe(
      weatherInfo => {
        let self = this;
        this.parser.parseString(weatherInfo,function(err,result){
          self.response = result;
        });

        this.storage.get('weatherInfo').subscribe((weather) => {
          if (!weather) {
            this.storage.set('weatherInfo', {[this.weatherService.city]:this.response}).subscribe(() => {});
          }
        });
      },
      error => console.log(error)
    )
  }
}
