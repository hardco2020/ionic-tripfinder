import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutcomeFoodPage } from './outcome-food.page';

const routes: Routes = [
  {
    path: '',
    component: OutcomeFoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutcomeFoodPageRoutingModule {}
