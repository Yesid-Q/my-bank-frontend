import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'transaction',
        loadChildren: () => import('./pages/transaction/transaction.module').then( m => m.TransactionPageModule)
      },
      {
        path: 'accounts',
        loadChildren: () => import('./pages/accounts/accounts.module').then( m => m.AccountsPageModule)
      },
      {
        path: 'create-account',
        loadChildren: () => import('./pages/form-account/form-account.module').then( m => m.FormAccountPageModule)
      },
      {
        path: 'edit-account/:id',
        loadChildren: () => import('./pages/form-account/form-account.module').then( m => m.FormAccountPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path: '',
        redirectTo: 'accounts',
        pathMatch: 'full',
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
