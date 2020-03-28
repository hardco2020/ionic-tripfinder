import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecommendResultPageRoutingModule } from './recommend-result-routing.module';

import { RecommendResultPage } from './recommend-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommendResultPageRoutingModule
  ],
  declarations: [RecommendResultPage]
})
export class RecommendResultPageModule {}
