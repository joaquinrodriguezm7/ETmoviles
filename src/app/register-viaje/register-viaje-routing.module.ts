import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterViajePage } from './register-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterViajePageRoutingModule {}
