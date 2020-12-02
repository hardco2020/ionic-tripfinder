import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { Phase23PageRoutingModule } from './phase23-routing.module';

import { Phase23Page } from './phase23.page';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    Phase23PageRoutingModule
  ],
  declarations: [Phase23Page]
})
export class Phase23PageModule {}
