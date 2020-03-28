import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'selecting-phase1',
    loadChildren: () => import('./schedule/selecting-phase1/selecting-phase1.module').then( m => m.SelectingPhase1PageModule)
  },
  {
    path: 'selecting-phase2',
    loadChildren: () => import('./schedule/selecting-phase2/selecting-phase2.module').then( m => m.SelectingPhase2PageModule)
  },
  {
    path: 'outcome',
    loadChildren: () => import('./schedule/outcome/outcome.module').then( m => m.OutcomePageModule)
  },  {
    path: 'recommend-result',
    loadChildren: () => import('./recommend-result/recommend-result.module').then( m => m.RecommendResultPageModule)
  },
  {
    path: 'view-detail',
    loadChildren: () => import('./view-detail/view-detail.module').then( m => m.ViewDetailPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
