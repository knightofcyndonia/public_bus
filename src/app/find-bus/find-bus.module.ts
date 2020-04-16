import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindBusPageRoutingModule } from './find-bus-routing.module';

import { FindBusPage } from './find-bus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindBusPageRoutingModule
  ],
  declarations: [FindBusPage]
})
export class FindBusPageModule {}
