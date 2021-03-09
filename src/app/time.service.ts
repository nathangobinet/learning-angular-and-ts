import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum State {
  Running,
  Stop,
}

export enum Type {
  Session,
  Break,
}

@Injectable({ providedIn: 'root' })
export class TimeService {
  // Duration of the two type in second
  static readonly defaultDuration= {
    session: 25 * 60,
    break: 5 * 60,
  };

  // Store the window interval id to clear it
  interval: number = 0;

  state: State = State.Stop;
  type: Type =  Type.Session;

  sessionDuration : number = TimeService.defaultDuration.session;
  breakDuration : number = TimeService.defaultDuration.break;

  private _remainingSeconds: number = this.sessionDuration;
  get remainingSeconds() : number { return this._remainingSeconds; }
  set remainingSeconds(value : number) {
    this._remainingSeconds = value;
    // Trigger event
    this.remainingUpdated.next(this.remainingSeconds);
    // Check for timer end
    if(this.remainingSeconds == 0) 
      this.handleTimerEnd()
  }

  remainingUpdated : Subject<number> = new Subject<number>();

  constructor() {this.play()}

  play() : void {
    this.state = State.Running;
    this.interval = window.setInterval(() => this.decrementRemaingTime(), 1000);
  }

  stop() : void {
    this.state = State.Stop;
    window.clearInterval(this.interval);
  }

  reset() : void {
    if(this.state == State.Running) this.stop();
    this.remainingSeconds = this.getDuration();
  }

  decrementRemaingTime() : void {
    this.remainingSeconds -= 1;
  }

  handleTimerEnd() : void {
    this.type = this.getNewType();
    this.remainingSeconds = this.getDuration();
  }

  getNewType() : Type {
    return (this.type == Type.Session) 
      ? Type.Break 
      : Type.Session;
  }

  getDuration() : number {
    return (this.type == Type.Session) 
      ? this.sessionDuration
      : this.breakDuration;
  } 

  switchState() : void {
    if(this.state == State.Running) this.stop();
    else this.play();
  }
}
