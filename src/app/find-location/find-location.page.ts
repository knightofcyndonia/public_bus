import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-location',
  templateUrl: './find-location.page.html',
  styleUrls: ['./find-location.page.scss'],
})
export class FindLocationPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goHomePage(){
    this.router.navigate(['/home/']);
  }

}
