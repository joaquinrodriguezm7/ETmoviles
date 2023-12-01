import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterCarPageRoutingModule } from './register-car-routing.module';

import { RegisterCarPage } from './register-car.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterCarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegisterCarPage]
})
export class RegisterCarPageModule {}
