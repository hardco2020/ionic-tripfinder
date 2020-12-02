import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Phase23Page } from './phase23.page';

const routes: Routes = [
  {
    path: '',
    component: Phase23Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Phase23PageRoutingModule {}
