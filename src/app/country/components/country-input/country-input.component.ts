import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-country-input',
  templateUrl: './country-input.component.html',
  styles: [
  ]
})
export class CountryInputComponent implements OnInit {

  @Input() placeholder: string = ''

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  debouncer: Subject<string> = new Subject();

  query: string = ''

  constructor() { }
  
  ngOnInit() {
    this.debouncer
    .pipe(
      debounceTime(400)
    )
    .subscribe( value => {
      this.onDebounce.emit( value );
    })
  }

  search(){
    this.onEnter.emit( this.query )
  }

  keyPressed( event: any) {
    this.debouncer.next( this.query );
  }

}
