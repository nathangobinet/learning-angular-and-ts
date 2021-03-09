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
  interval!: number;

  // Application states
  state: State = State.Stop;
  type: Type =  Type.Session;

  private _sessionDuration : number = TimeService.defaultDuration.session;
  get sessionDuration() : number { return this._sessionDuration; }
  set sessionDuration(value : number) { 
    this._sessionDuration = value;
    if (this.state === State.Stop && this.type === Type.Session)
      this.remainingSeconds = value;
  }

  private _breakDuration : number = TimeService.defaultDuration.break;
  get breakDuration() : number { return this._breakDuration; }
  set breakDuration(value : number) { 
    this._breakDuration = value;
    if (this.state === State.Stop && this.type === Type.Break)
      this.remainingSeconds = value;
  }

  private _remainingSeconds: number = this.sessionDuration;
  get remainingSeconds() : number { return this._remainingSeconds; }
  set remainingSeconds(value : number) {
    this._remainingSeconds = value;
    if(this.remainingSeconds == 0) 
      this.handleTimerEnd()
  }

  constructor() { }

  public switchState() : void {
    if(this.state == State.Running) this.stop();
    else this.play();
  }

  public reset() : void {
    if(this.state == State.Running) this.stop();
    this.remainingSeconds = this.getDuration();
  }

  private getDuration() : number {
    return (this.type == Type.Session) 
      ? this.sessionDuration
      : this.breakDuration;
  } 

  public play() : void {
    this.state = State.Running;
    this.interval = window.setInterval(() => this.decrementRemaingTime(), 1000);
  }

  public stop() : void {
    this.state = State.Stop;
    window.clearInterval(this.interval);
  }

  private decrementRemaingTime() : void {
    this.remainingSeconds -= 1;
  }

  private handleTimerEnd() : void {
    this.type = this.getNewType();
    this.remainingSeconds = this.getDuration();
    this.playBeep()
  }

  private getNewType() : Type {
    return (this.type == Type.Session) 
      ? Type.Break 
      : Type.Session;
  }

  private playBeep() {
    let audio = new Audio();
    audio.src = "https://raw.githubusercontent.com/nathangobinet/podomoroclock/master/ressources/beep4.wav";
    audio.load();
    audio.play();
  }

  public incrementSessionDuration() : void { this.sessionDuration += 60 }
  public incrementBreakDuration() : void { this.breakDuration += 60 }
  public decrementSessionDuration() : void { this.sessionDuration -= 60 }
  public decrementBreakDuration() : void { this.breakDuration -= 60 }
}
