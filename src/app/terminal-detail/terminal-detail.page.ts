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

  idTerminalSource;
  idTerminalDest;

   locationIndex = 0;
   timeArrival;


  
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
    // this.getETA();
  }
  
  ngOnInit() {
  }

  getBusLocation()
  {
    console.log("masuk anon login");

    this.afAuth.signInAnonymously().then(res => {
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
    console.log(this.locations);
  }

  getData()
  {
    this.params = this.activatedRoute.snapshot.paramMap.get("url");
    const splitParams = this.params.split("&&");
    this.idTerminalSource = splitParams[0];
    this.idTerminalDest = parseInt(splitParams[1]);

    //Get Terminal Source
    this.terminalService.getTerminalById(this.idTerminalSource).subscribe((response) =>{
      this.terminalSource = response;
      console.log("Terminal Source " + this.terminalSource);
    });

    //Get Terminal Destination
    this.terminalService.getTerminalById(this.idTerminalDest).subscribe((res) =>{
      this.terminalDest = res;
      console.log("Terminal Dest " + this.terminalDest);
    });

  }

  goHomePage(){
    this.router.navigate(['/find-location']);
  }

  getETA(location){
    // Add Distance Matrix here
    let locationOrigins = location.lat.toString() + ", " + location.lng.toString();
    let locationDestination = this.terminalDest.lat.toString() + ", " + this.terminalDest.lng.toString();
    
    const service = new google.maps.DistanceMatrixService(); // instantiate Distance Matrix service
    const matrixOptions = {
      // origins: ["1.119897, 104.048092"], // technician locations
      origins : [locationOrigins],
      destinations: [locationDestination], // customer address
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.IMPERIAL
    };
      
      // Call Distance Matrix service
      this.getDistanceMatrix(matrixOptions, service);
  }

  getDistanceMatrix(matrixOptions, service){
    service.getDistanceMatrix(matrixOptions, this.callback);    
  }

  // Callback function used to process Distance Matrix response
  callback(response, status) 
  {
    if (status !== "OK")
    {
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
    this.timeArrival = drivetime;
    $(".bus-time").html(this.timeArrival);
  }

  // Redraw all markers on the map
  updateMap(locations) {
    console.log("masuk update map");
    // Remove all current marker
    // this.markers.map(marker => marker.setMap(null));
    // this.markers = [];
  
    let indexs = this.locationIndex
    for (let loc of locations) {

      let latLng = new google.maps.LatLng(loc.lat, loc.lng);
      this.getETA(loc);
      let marker = new google.maps.Marker({
        // map: this.maps,
        animation: google.maps.Animation.DROP,
        position: latLng
      });

      indexs = this.locationIndex + 1;
      this.locationIndex += indexs;
      // this.markers.push(marker);
      // this.lastLocation = loc;
    }
  }
}
