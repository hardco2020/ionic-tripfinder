import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Phase22PageRoutingModule } from './phase22-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Phase22Page } from './phase22.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    Phase22PageRoutingModule
  ],
  declarations: [Phase22Page]
})
export class Phase22PageModule {}
