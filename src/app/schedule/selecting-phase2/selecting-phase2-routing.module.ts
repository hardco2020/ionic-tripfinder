import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectingPhase2Page } from './selecting-phase2.page';

const routes: Routes = [
  {
    path: '',
    component: SelectingPhase2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectingPhase2PageRoutingModule {}
