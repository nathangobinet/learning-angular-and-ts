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
}
