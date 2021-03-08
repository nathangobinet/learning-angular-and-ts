import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

enum State {
  Running,
  Stop,
}

enum Type {
  Session,
  Break,
}

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  static readonly defaultTimes = {
    session: 25 * 60,
    break: 5 * 60,
  };

  interval: number = 0;
  state: State = State.Stop;
  type: Type =  Type.Session;

  remainingSeconds: number = TimeService.defaultTimes.session;
  remainingUpdated : Subject<number> = new Subject<number>();

  constructor() {}

  play() {
    this.interval = window.setInterval(() => this.updateRemainingSeconds(), 1000);
  }

  stop() {
    window.clearInterval(this.interval);
  }

  updateRemainingSeconds() {
    this.remainingSeconds -= 1;
    this.remainingUpdated.next(this.remainingSeconds);
  }
}
