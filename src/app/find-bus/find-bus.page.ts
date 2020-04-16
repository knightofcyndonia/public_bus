import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-bus',
  templateUrl: './find-bus.page.html',
  styleUrls: ['./find-bus.page.scss'],
})
export class FindBusPage implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  goHomePage()
  {
    this.router.navigate(['/home/']);
  }

}
