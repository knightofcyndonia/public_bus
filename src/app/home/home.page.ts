import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  title = 'Public Bus ETA';

  constructor(private router: Router) 
  {

  }

  goFindLocationPage(){
    this.router.navigate(['/find-location/']);
  }

  goFindBusPage(){
    this.router.navigate(['/find-bus/']);
  }

}
