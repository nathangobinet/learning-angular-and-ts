import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RemainingTimeComponent } from './remaining-time/remaining-time.component';
import { TimeBoxComponent } from './time-box/time-box.component';
import { TimesConfigureComponent } from './times-configure/times-configure.component';
import { TimeControllerComponent } from './time-controller/time-controller.component';
import { TimeInputComponent } from './time-input/time-input.component';

@NgModule({
  declarations: [
    AppComponent,
    RemainingTimeComponent,
    TimeBoxComponent,
    TimesConfigureComponent,
    TimeControllerComponent,
    TimeInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
