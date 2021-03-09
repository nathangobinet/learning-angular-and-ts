import { Component } from '@angular/core';

import { TimeService, Type, State } from '../time.service';

@Component({
  selector: 'app-time-controller',
  templateUrl: './time-controller.component.html',
})
export class TimeControllerComponent {
  Type = Type;
  State = State;
  timeService : TimeService;

  constructor(timeService : TimeService) {
    this.timeService = timeService;
  }

  switchState() {
    this.timeService.switchState();
  }

  reset() {
    this.timeService.reset();
  }
}
