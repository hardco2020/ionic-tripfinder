import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SelectingFood1PageRoutingModule } from './selecting-food1-routing.module';
import { SelectingFood1Page } from './selecting-food1.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SelectingFood1PageRoutingModule
  ],
  declarations: [SelectingFood1Page]
})
export class SelectingFood1PageModule {}
