import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindBusPage } from './find-bus.page';

const routes: Routes = [
  {
    path: '',
    component: FindBusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindBusPageRoutingModule {}
