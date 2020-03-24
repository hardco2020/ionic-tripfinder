import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutcomePage } from './outcome.page';

const routes: Routes = [
  {
    path: '',
    component: OutcomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutcomePageRoutingModule {}
