import { Component, OnInit } from '@angular/core';
import { CitiesHttpService } from '../services/cities.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map , startWith } from 'rxjs/operators';
import { addCityToTrackListService } from '../services/addCityToTrackList.service';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.scss']
})

export class SearchCityComponent implements OnInit {
  constructor(private cityService: CitiesHttpService, private addCity: addCityToTrackListService) {}
  public cityListInfo: any[];
  public newTrackCity: string;
  public setTrackListLS: string[] = [];
  MyControl = new FormControl();
  filteredOptions: Observable<string[]>;

  displayFn(subject): any {
    return subject ? subject : undefined;
  }

  ngOnInit() {
    if (!localStorage.getItem('TrackCityList')) {
      localStorage.setItem('TrackCityList',JSON.stringify(['Minsk']));
    }

    this.filteredOptions = this.MyControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.cityService.getCity().subscribe(array => {
      this.cityListInfo = array;
      localStorage.setItem('cityListName', JSON.stringify([...new Set( this.cityListInfo.map(obj => obj.name))]));
    });
  }

  addCityToTrackList() {
    const input = document.getElementsByTagName('input')[0];
    const listContainer = document.getElementsByClassName('list-container')[0];
    const listContainerItems = listContainer.getElementsByClassName('list-item');

    if (input.value) {
      if (!localStorage.getItem('TrackCityList')) {
        if (this.setTrackListLS.indexOf(this.newTrackCity) === -1) {
          this.setTrackListLS.push(this.newTrackCity);
          localStorage.setItem('TrackCityList', JSON.stringify(this.setTrackListLS));
        }
      } else {
        const cityLS = JSON.parse(localStorage.getItem('TrackCityList'));
        cityLS.push(this.newTrackCity);
        localStorage.setItem('TrackCityList', JSON.stringify(cityLS));
      }

      this.addCity.doClick(this.newTrackCity);
      input.value = '';

      if (listContainerItems.length > 3) {
        listContainer.classList.add('scroll');
      }
    }
  }

  private _filter(value: string): string[] {
    if (value.length > 2) {
      const filterValue = value.toLowerCase();
      return JSON.parse(localStorage.getItem('cityListName')).filter(option =>
        option.toLowerCase().includes(filterValue)
      );
    }
  }
}

