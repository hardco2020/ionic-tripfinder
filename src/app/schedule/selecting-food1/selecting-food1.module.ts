import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectingFood1PageRoutingModule } from './selecting-food1-routing.module';

import { SelectingFood1Page } from './selecting-food1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectingFood1PageRoutingModule
  ],
  declarations: [SelectingFood1Page]
})
export class SelectingFood1PageModule {}
