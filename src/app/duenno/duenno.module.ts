import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DuennoPageRoutingModule } from './duenno-routing.module';

import { DuennoPage } from './duenno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DuennoPageRoutingModule
  ],
  declarations: [DuennoPage]
})
export class DuennoPageModule {}
