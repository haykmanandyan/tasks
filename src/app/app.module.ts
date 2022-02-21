import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RandomNumberComponent} from './common/random-number/random-number.component';
import {CombineUserComponent} from './common/combine-user/combine-user.component';
import {HttpClientModule} from "@angular/common/http";
import { NestedTaskComponent } from './common/nested-task/nested-task.component';
import { MoveComponent } from './common/move/move.component';

@NgModule({
  declarations: [
    AppComponent,
    RandomNumberComponent,
    CombineUserComponent,
    NestedTaskComponent,
    MoveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
