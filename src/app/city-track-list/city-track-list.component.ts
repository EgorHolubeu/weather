import { Component, AfterViewInit } from '@angular/core';
import { CityWeatherHttpService } from '../services/cityWeather.http.service';
import { addCityToTrackListService } from '../services/addCityToTrackList.service';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-city-track-list',
  templateUrl: './city-track-list.component.html',
  styleUrls: ['./city-track-list.component.scss']
})
export class CityTrackListComponent implements AfterViewInit{
  itemsList = document.getElementsByClassName('list-item');
  public trackListLS: string[] = JSON.parse(localStorage.getItem('TrackCityList'));
  public activeItem: string;

  constructor(private weatherService: CityWeatherHttpService, private addCityService: addCityToTrackListService,
              private storage: StorageMap) {
    this.addCityService.onClick.subscribe(
      city => {
        this.trackListLS.push(city);
      }
    )
  }

  refresh(target) {
    if (target.parentNode.parentNode.classList.contains('active')) {
      const citySpan = target.parentNode.parentNode.getElementsByTagName('span')[0];
      this.weatherService.getCityName(citySpan.textContent);
    }
  }

  delete(target) {
      const itemDel = target.parentNode.parentNode;
      const listContainer = document.getElementsByClassName('list-container')[0];
      const listContainerItems = listContainer.getElementsByClassName('list-item');

      target.parentNode.parentNode.remove();
      const cityList = JSON.parse(localStorage.getItem('TrackCityList'));

      for (let i = 0; i < cityList.length; i++) {
        if (itemDel.getElementsByTagName('span')[0].textContent === cityList[i]) {
          cityList.splice(i, 1);
        }
      }
      localStorage.setItem('TrackCityList', JSON.stringify(cityList));
      this.storage.delete('user').subscribe(() => {
      });

      if (listContainerItems.length > 3) {
        listContainer.classList.add('scroll');
      }
  }

  getCity(target) {
    if (target.classList.contains('list-item')) {
      if (!target.classList.contains('refresh') && !target.classList.contains('delete')) {
        const citySpan = target.getElementsByTagName('span')[0];
        this.weatherService.getCityName(citySpan.textContent);
      } else {
        if (!target.parentNode.classList.contains('refresh') && !target.parentNode.classList.contains('delete')) {
          const citySpan = target.parentNode.getElementsByTagName('span')[0];
          this.weatherService.getCityName(citySpan.textContent);
        }
      }
    }
  }

  getCityWeather(city) {
    this.weatherService.getCityName(city);
  }

  onSelectItem(target): void {
    if (target.classList.contains('list-item')) {
      const city = target.getElementsByTagName('span')[0].textContent;
      this.weatherService.getCityName(city);
      for (let i = 0; i < this.itemsList.length; i++) {
        this.itemsList[i].classList.remove('active');
      }

      this.activeItem = city;
    } else {
      const city = target.parentNode.getElementsByTagName('span')[0].textContent;
      this.weatherService.getCityName(city);
      for (let i = 0; i < this.itemsList.length; i++) {
        this.itemsList[i].classList.remove('active');
      }

      this.activeItem = city;
    }

  }


  ngAfterViewInit() {
    const listContainer = document.getElementsByClassName('list-container')[0];
    const listContainerItems = listContainer.getElementsByClassName('list-item');

    if (listContainerItems.length > 3) {
      listContainer.classList.add('scroll');
    }

    this.getCityWeather(this.itemsList[0].childNodes[0].textContent);
  }
}
