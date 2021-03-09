import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-time-input',
  templateUrl: './time-input.component.html',
})
export class TimeInputComponent {
  @Output() onIncrement: EventEmitter<any> = new EventEmitter();
  @Output() onDecrement: EventEmitter<any> = new EventEmitter();
  @Input() time! : number;

  constructor() { }
}
