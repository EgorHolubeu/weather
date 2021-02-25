import {Injectable} from '@angular/core';
import {EventEmitter} from '@angular/core';

@Injectable({
  providedIn:'root'
})

export class addCityToTrackListService {
  onClick:EventEmitter<string> = new EventEmitter();

  public doClick(list){
    this.onClick.emit(list);
  }
}
