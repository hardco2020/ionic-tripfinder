import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectingFood1Page } from './selecting-food1.page';

const routes: Routes = [
  {
    path: '',
    component: SelectingFood1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectingFood1PageRoutingModule {}
