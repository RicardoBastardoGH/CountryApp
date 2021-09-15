import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
  styles: [
  ]
})
export class ByRegionComponent implements OnInit {

  regions : string[] = ['africa', 'americas', 'asia', 'europe', 'oceania']
  activeRegion: string = ''
  countries: Country[] = []

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
  }

  getCssClass( region: string ) {
    return (region === this.activeRegion) ? 'btn btn-primary me-1' : 'btn btn-outline-primary me-1'
  }

  activateRegion( region: string ) {
    
    if ( region === this.activeRegion) { return; } 
    
    this.activeRegion = region

    this.countryService.getCountriesByRegion( region )
    .subscribe(
      countries => {
        console.log(countries);
        this.countries = [];
        this.countries = countries;
      }
    )
  }

}
