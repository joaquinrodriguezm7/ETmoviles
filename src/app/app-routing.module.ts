import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoIngresadoGuard } from './no-ingresado.guard';
import { IngresadoGuard } from './ingresado.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'loader',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'restablecer',
    loadChildren: () => import('./restablecer/restablecer.module').then( m => m.RestablecerPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'loader',
    loadChildren: () => import('./loader/loader.module').then( m => m.LoaderPageModule)
  },  {
    path: 'viaje',
    loadChildren: () => import('./viaje/viaje.module').then( m => m.ViajePageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
