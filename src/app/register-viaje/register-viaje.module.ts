import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterViajePageRoutingModule } from './register-viaje-routing.module';

import { RegisterViajePage } from './register-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterViajePageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [RegisterViajePage]
})
export class RegisterViajePageModule {}
