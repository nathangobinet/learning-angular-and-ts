import { Component } from '@angular/core';

import { TimeService } from '../time.service';

@Component({
  selector: 'app-times-configure',
  templateUrl: './times-configure.component.html',
})
export class TimesConfigureComponent {
  timeService : TimeService

  constructor(timeService : TimeService) {
    this.timeService = timeService;
  }
}
