import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutcomePageRoutingModule } from './outcome-routing.module';

import { OutcomePage } from './outcome.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutcomePageRoutingModule
  ],
  declarations: [OutcomePage]
})
export class OutcomePageModule {


}
