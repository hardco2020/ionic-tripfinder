import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Phase22Page } from './phase22.page';

const routes: Routes = [
  {
    path: '',
    component: Phase22Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Phase22PageRoutingModule {}
