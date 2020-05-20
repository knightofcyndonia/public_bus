import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TerminalDetailPage } from './terminal-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TerminalDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TerminalDetailPageRoutingModule {}
