import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styles: [
  ]
})
export class CountryDetailsComponent implements OnInit {

  country!: Country ;

  constructor(private activatedRoute: ActivatedRoute,
              private countryService: CountryService) { }

  ngOnInit(): void {
    
    this.activatedRoute.params
      .pipe(
        switchMap( ({countryId}) => this.countryService.getCountryByAlpha( countryId ) ),
        tap( console.log )
      )
      .subscribe( country => {
        this.country = country; 
      })
    
  //   this.activatedRoute.params
  //     .subscribe( ({ countryId }) => {
  //       console.log( countryId );

  //       this.countryService.getCountryByAlpha( countryId )
  //       .subscribe(
  //         country => {
  //           console.log(country);
  //         }
  //       )

  //     })
 }

}
