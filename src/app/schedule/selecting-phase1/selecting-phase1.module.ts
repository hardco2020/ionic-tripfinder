import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectingPhase1PageRoutingModule } from './selecting-phase1-routing.module';

import { SelectingPhase1Page } from './selecting-phase1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectingPhase1PageRoutingModule
  ],
  declarations: [SelectingPhase1Page]
})
export class SelectingPhase1PageModule {}
