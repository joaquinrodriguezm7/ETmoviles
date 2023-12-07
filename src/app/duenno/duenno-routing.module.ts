import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DuennoPage } from './duenno.page';

const routes: Routes = [
  {
    path: '',
    component: DuennoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DuennoPageRoutingModule {}
