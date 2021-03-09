import { Component } from '@angular/core';

import { TimeService } from '../time.service';

@Component({
  selector: 'app-remaining-time',
  templateUrl: './remaining-time.component.html',
})
export class RemainingTimeComponent{
  timeService : TimeService;

  constructor(timeService : TimeService) { 
    this.timeService = timeService;
  }

  getMinute() : string {
    const minutes = Math.floor(this.timeService.remainingSeconds / 60);
    return (`0${minutes}`).slice(-2);
  }

  getSecond() : string {
    const seconds = this.timeService.remainingSeconds % 60;
    return (`0${seconds}`).slice(-2);
  }
}