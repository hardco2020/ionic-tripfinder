import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecommendResultPage } from './recommend-result.page';

const routes: Routes = [
  {
    path: '',
    component: RecommendResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecommendResultPageRoutingModule {}
