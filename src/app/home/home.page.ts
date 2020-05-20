import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';


declare var google: any ;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  map:any;
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

  // ionViewDidEnter(){
  ionViewWillEnter(){
    this.getETA();
  }

  getETA(){
    this.map = new google.maps.Map(document.getElementById("map"), {
      // center: {lat: 1.118914, lng: 104.048442},
      // zoom: 15
      zoom: 15,
      center: {lat: 1.037402, lng: 103.976902}
    });

    // const cities = [
    //   {lat: 1.119897, lng: 104.048092}, // Terminal Politeknik negeri batam 1
    //   {lat: 1.129850, lng: 104.054040}, //Terminal Engku putri
    //   {lat: 1.120358, lng: 104.048805} //Terminal KFC Politeknik
    // ];

    const cities = [
      {lat: 1.119897, lng: 104.048092, terminalName : "Terminal Politeknik negeri batam 1"}, // Terminal Politeknik negeri batam 1
      {lat: 1.129850, lng: 104.054040, terminalName : "Terminal Engku Putri"}, //Terminal Engku putri
      {lat: 1.120358, lng: 104.048805, terminalName : "Terminal Politeknik negeri batam 2"} //Terminal KFC Politeknik
    ];

    // Loop through cities, adding markers
    for (let i=0; i<cities.length; i++) {
      let position = cities[i]; // location of one city
      // create marker for a city
      let mk = new google.maps.Marker({position: position, map: this.map});
    }

    // Add Distance Matrix here
    const service = new google.maps.DistanceMatrixService(); // instantiate Distance Matrix service
    const matrixOptions = {
      origins: ["1.119897, 104.048092"], // technician locations
      destinations: ["1.129850, 104.054040"], // customer address
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.IMPERIAL
    };
      
      // Call Distance Matrix service
      this.getDistanceMatrix(matrixOptions, service);
  }

  getDistanceMatrix(matrixOptions, service){
    var remain = service.getDistanceMatrix(matrixOptions, this.callback);
    console.log("JUDE ");
    console.log(remain);
  }

  // Callback function used to process Distance Matrix response
  callback(response, status) {
    if (status !== "OK") {
    alert("Error with distance matrix");
    return;
    }
    console.log(response);

    //calculation matrix
    let routes = response.rows[0].elements;
    let leastseconds = 86400; // 24 hours
    let drivetime = "";
    let closest = "";

    for (let i=0; i<routes.length; i++) {
        const routeseconds = routes[i].duration.value;
        if (routeseconds > 0 && routeseconds < leastseconds) {
        leastseconds = routeseconds; // this route is the shortest (so far)
        drivetime = routes[i].duration.text; // hours and minutes
        closest = response.originAddresses[i]; // city name from destinations
        }
    }
    $("#card-terminal-name").html("Terminal Politeknik");
    $("#card-time").html(drivetime);
  }
}
    //end