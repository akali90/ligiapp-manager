import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesrestapiService {

  constructor( private http: HttpClient ) { }

  getApiRestCountries() {

      return this.http.get( 'https://restcountries.com/v3.1/all' );

  }

  getApiRestCountriesByName(nameCountrie: string) {

    return this.http.get( 'https://restcountries.com/v3.1/name/' + nameCountrie );

}


}
