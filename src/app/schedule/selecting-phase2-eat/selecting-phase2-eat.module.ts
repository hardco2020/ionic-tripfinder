import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectingPhase2EatPageRoutingModule } from './selecting-phase2-eat-routing.module';

import { SelectingPhase2EatPage } from './selecting-phase2-eat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectingPhase2EatPageRoutingModule
  ],
  declarations: [SelectingPhase2EatPage]
})
export class SelectingPhase2EatPageModule {}
