import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'find-location', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'find-location',
    loadChildren: () => import('./find-location/find-location.module').then( m => m.FindLocationPageModule)
  },
  // {
  //   path: 'terminal-detail',
  //   loadChildren: () => import('./terminal-detail/terminal-detail.module').then( m => m.TerminalDetailPageModule)
  // },
  {
    path: 'terminal-detail/:url',
    loadChildren: () => import('./terminal-detail/terminal-detail.module').then( m => m.TerminalDetailPageModule)
  },
  {
    path: 'map-view',
    loadChildren: () => import('./map-view/map-view.module').then( m => m.MapViewPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
