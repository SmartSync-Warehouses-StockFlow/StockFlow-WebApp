// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { SettingComponent } from './StockFlow/setting/setting.component';
import {ProfileComponent} from './StockFlow/profile/profile.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard/default',
        loadComponent: () => import('./StockFlow/default/dashboard/dashboard.component').then((c) => c.DefaultComponent)
      },

      {
        path: 'sample-page',
        loadComponent: () => import('./StockFlow/other/sample-page/sample-page.component')
      },
      {
        path: 'setting', // Ruta añadida para el componente Setting
        loadComponent: () => import('./StockFlow/setting/setting.component').then((c) => c.SettingComponent)
      },
      {
        path: 'profile', // Ruta añadida para el componente Setting
        loadComponent: () => import('./StockFlow/profile/profile.component').then((c) => c.ProfileComponent)
      },
      {
        path: 'manage-store',
        loadComponent:()=> import('./StockFlow/other/sample-page/manage-store/manage-store.component')
      },
      {
        path:'orders',
        loadComponent:()=> import('./StockFlow/other/sample-page/orders/orders.component')
      },
      {
        path: 'inventory',
        loadComponent:() => import ('./StockFlow/other/sample-page/inventory/inventory.component')
      },
      {path:'suppliers',
        loadComponent:() =>import ('./StockFlow/other/sample-page/suppliers/suppliers.component')

      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./StockFlow/authentication/login/login.component')
      },


      {
        path: 'register',
        loadComponent: () => import('./StockFlow/authentication/register/register.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
