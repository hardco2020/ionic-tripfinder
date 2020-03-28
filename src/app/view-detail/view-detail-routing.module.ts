import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewDetailPage } from './view-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ViewDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewDetailPageRoutingModule {}
