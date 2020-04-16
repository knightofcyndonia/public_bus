import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router) { }

  goHomePage(){
    this.router.navigate(['/home/']);
  }
  

  goFindLocationPage(){
    this.router.navigate(['/find-location/']);
  }

  goFindBusPage(){
    this.router.navigate(['/find-bus/']);
  }
}
