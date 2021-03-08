import { Component } from '@angular/core';

import { TimeService } from '../time.service';

@Component({
  selector: 'app-remaining-time',
  templateUrl: './remaining-time.component.html',
})
export class RemainingTimeComponent{
  remainingSeconds;
  _subscription;
  
  constructor(private timeService : TimeService) { 
    this.remainingSeconds = timeService.remainingSeconds;
    this._subscription = timeService.remainingUpdated.subscribe((value) => { 
      this.remainingSeconds = value; 
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
