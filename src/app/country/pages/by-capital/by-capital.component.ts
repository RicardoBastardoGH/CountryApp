import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital',
  templateUrl: './by-capital.component.html',
  styles: [
  ]
})
export class ByCapitalComponent implements OnInit {

  query: string = ''
  errorFound: boolean = false;
  countries: Country[] = []

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
  }

  search( query: string){
    this.errorFound = false;
    this.query  = query;

    this.countryService.getCountriesByCapital(this.query)
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
    //TODO: Crear sugerencias
  }
}
