import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TerminalDetailPageRoutingModule } from './terminal-detail-routing.module';

import { TerminalDetailPage } from './terminal-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TerminalDetailPageRoutingModule
  ],
  declarations: [TerminalDetailPage]
})
export class TerminalDetailPageModule {}
