import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutcomeFoodPageRoutingModule } from './outcome-food-routing.module';

import { OutcomeFoodPage } from './outcome-food.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutcomeFoodPageRoutingModule
  ],
  declarations: [OutcomeFoodPage]
})
export class OutcomeFoodPageModule {}
