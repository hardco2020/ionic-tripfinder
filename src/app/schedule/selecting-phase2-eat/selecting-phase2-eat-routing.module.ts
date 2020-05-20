import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectingPhase2EatPage } from './selecting-phase2-eat.page';

const routes: Routes = [
  {
    path: '',
    component: SelectingPhase2EatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectingPhase2EatPageRoutingModule {}
