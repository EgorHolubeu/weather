import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CitiesHttpService {
  constructor(private http: HttpClient) {}

  getCity(): Observable<any>{
    return this.http.get('assets/city.json');
  }
}
