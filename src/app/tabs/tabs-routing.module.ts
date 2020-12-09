import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../schedule/tab1.module').then(m => m.Tab1PageModule)
          },
          {
            path: 'selecting-phase1',
            children: [
              {
                path: '',
                loadChildren: () => import('../schedule/selecting-phase1/selecting-phase1.module').then( m => m.SelectingPhase1PageModule)
                // import('../test/test.module').then(m => m.TestPageModule)
              }
            ]
          },
          {
            path: 'phase22',
            children: [
              {
                path: '',
                loadChildren: () => import('../schedule/phase22/phase22.module').then( m => m.Phase22PageModule)
                // import('../test/test.module').then(m => m.TestPageModule)
              }
            ]
          },
          {
            path: 'outcome',
            children: [
              {
                path: '',
                loadChildren: () => import('../schedule/outcome/outcome.module').then( m => m.OutcomePageModule)
                // import('../test/test.module').then(m => m.TestPageModule)
              }
            ]
          },
          {
            path: 'selecting-food1',
            children: [
              {
                path: '',
                loadChildren: () => import('../schedule/selecting-food1/selecting-food1.module').then( m => m.SelectingFood1PageModule)
                // import('../test/test.module').then(m => m.TestPageModule)
              }
            ]
          },
          {
            path: 'outcome-food',
            children: [
              {
                path: '',
                loadChildren: () => import('../schedule/outcome-food/outcome-food.module').then( m => m.OutcomeFoodPageModule)
                // import('../test/test.module').then(m => m.TestPageModule)
              }
            ]
          },
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () =>
             import('../myrecord/tab3.module').then(m => m.Tab3PageModule)
            // import('../test/test.module').then(m => m.TestPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
