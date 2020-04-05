import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectingPhase2PageRoutingModule } from './selecting-phase2-routing.module';
import { SelectingPhase2Page } from './selecting-phase2.page';


import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SelectingPhase2PageRoutingModule
  ],
  declarations: [SelectingPhase2Page]
})
export class SelectingPhase2PageModule {}
