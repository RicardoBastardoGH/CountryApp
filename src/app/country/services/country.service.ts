import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiUrl: string = 'https://restcountries.eu/rest/v2'

  get httpParams(){
    return new HttpParams().set('filds','name;capital;alpha2Code;flag;population')
  }

  constructor(private http: HttpClient) { }

  getCountry( query: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${query}`;
    return this.http.get<Country[]> ( url )
  }

  getCountriesByCapital( query: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${query}`;
    return this.http.get<Country[]> ( url,{ params: this.httpParams } )
  }

  getCountryByAlpha( id: string): Observable<Country> {
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country> ( url )
  }

  getCountriesByRegion( region: string ): Observable<Country[]> {
    
    const url = `${this.apiUrl}/region/${region}`;
    return this.http.get<Country[]>( url ,{ params: this.httpParams })
              .pipe(
                tap( console.log )
              )
  }
}
