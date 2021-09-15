import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-coutry',
  templateUrl: './by-country.component.html',
  styles: [`
    li{
      cursor: pointer
    }
  `
  ]
})
export class ByCountryComponent implements OnInit {

  query: string = ''
  errorFound: boolean = false;
  countries: Country[] = [];
  suggestedCountries: Country[] = [];
  showSuggestions: boolean = false;

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
  }

  search( query: string){
    this.errorFound = false;
    this.query  = query;
    this.showSuggestions = false;

    this.countryService.getCountry(this.query)
      .subscribe(
        countries => {
          console.log(countries);
          this.countries = countries;
        },
        err => {
          this.errorFound = true;
          this.countries= []
        }
      );
  }

  suggestions( query: string ) {
    this.errorFound = false;
    this.query = query;
    
    this.countryService.getCountry( query )
      .subscribe(countries => {
        this.suggestedCountries = countries.splice(0,3);
        this.showSuggestions = true;
      },
      error => {
        this.suggestedCountries = [];
        this.showSuggestions = false;
      })
  }
}
