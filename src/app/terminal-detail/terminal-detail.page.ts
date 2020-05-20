import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {listofTerminals} from '../data/list-terminals';
import { TerminalService } from '../services/terminal.service';
import * as $ from 'jquery';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';

import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;

declare var google: any ;

@Component({
  selector: 'app-terminal-detail',
  templateUrl: './terminal-detail.page.html',
  styleUrls: ['./terminal-detail.page.scss'],
})
export class TerminalDetailPage implements OnInit {
  map:any;
  title = 'Public Bus ETA';
  listTerminals = [];
  params = '';

  locations: Observable <any>;
  locationsCollection: AngularFirestoreCollection<any>;
  user = null;

  terminalSource: any = [];
  terminalDest: any = [];

  
  // @ViewChild('map') mapElement: ElementRef;
  // maps: any;
  // markers = []; 


  constructor(
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private terminalService : TerminalService,
    
    private afAuth : AngularFireAuth,
    private  afs: AngularFirestore
    ) 
  {
    this.getBusLocation();
  }

  // ionViewDidEnter(){
  ionViewWillEnter(){
    this.listTerminals = listofTerminals;
    this.getData();
    this.getETA();
  }
  
  ngOnInit() {
  }

  getBusLocation(){
      console.log("masuk anon login");
      this.afAuth.signInAnonymously().then(res =>{
        console.log(res);
        this.user = res.user;
        console.log("angular firestore");
        console.log(this.afs)
        this.locationsCollection = this.afs.collection(
          `locations`,
          ref => ref.orderBy('timestamp')
        )
  
  
        //load firebase data
        // this.locations = this.locationsCollection.valueChanges();
  
        //make sure we also get the Firebase item ID!
        this.locations = this.locationsCollection.snapshotChanges().pipe(
          map(actions =>
            actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            })
          )
        );
  
        //update map
        this.locations.subscribe(locations => {
          console.log('new locations :', locations);
          this.updateMap(locations);
        });
      })

      console.log("gps detech");
      console.log(this.locations);
  
  }

  getData()
  {
    this.params = this.activatedRoute.snapshot.paramMap.get("url");
    const splitParams = this.params.split("&&");
    const idTerminalSource = splitParams[0];
    const idTerminalDest = parseInt(splitParams[1]);

    //Get Terminal Source
    this.terminalService.getTerminalById(idTerminalSource).subscribe((response) =>{
      this.terminalSource = response;
      console.log("Terminal Source " + this.terminalSource);
    });

    //Get Terminal Destination
    this.terminalService.getTerminalById(idTerminalDest).subscribe((res) =>{
      this.terminalDest = res;
      console.log("Terminal Dest " + this.terminalDest);
    });

  }

  goHomePage(){
    this.router.navigate(['/find-location']);
  }

  getETA(){
    this.map = new google.maps.Map(document.getElementById("map"), {
      // center: {lat: 1.118914, lng: 104.048442},
      // zoom: 15
      zoom: 15,
      center: {lat: 1.037402, lng: 103.976902}
    });

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
    // $("#card-terminal-name").html("Terminal Politeknik");
    $("#card-time").html(drivetime);
  }

  // Redraw all markers on the map
    updateMap(locations) {
      
      console.log("masuk update map");
      // Remove all current marker
      // this.markers.map(marker => marker.setMap(null));
      // this.markers = [];
    
      for (let loc of locations) {
        let latLng = new google.maps.LatLng(loc.lat, loc.lng);
    
        let marker = new google.maps.Marker({
          // map: this.maps,
          animation: google.maps.Animation.DROP,
          position: latLng
        });
        // this.markers.push(marker);
        // this.lastLocation = loc;
      }
    }
}
