import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectingPhase1Page } from './selecting-phase1.page';

const routes: Routes = [
  {
    path: '',
    component: SelectingPhase1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectingPhase1PageRoutingModule {}
