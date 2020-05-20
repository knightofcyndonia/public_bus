import { Component, OnInit } from '@angular/core';
import { TerminalService } from '../services/terminal.service';
import { UtilsService } from '../services/utils.service';


declare var google: any ;

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.page.html',
  styleUrls: ['./map-view.page.scss'],
})
export class MapViewPage implements OnInit {

  listTerminals : any = [];
  constructor(
    private terminalService: TerminalService,
    private utils : UtilsService) { }

  ngOnInit() {
  }

  map:any;
  finalTime = "";

  ionViewDidEnter()
  {
    this.getData();

    
  }

  getData(){
    this.terminalService.getAllTerminals().subscribe(
      (response) => {
        console.log(response);
        this.listTerminals = response;
        this.fnFuck();
      },
      (err) => {
        this.listTerminals = [];
        console.log(JSON.stringify(err));
        this.utils.showToast("Terjadi Kesalahan");
      }
      )
  }

  fnFuck(){
    this.map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: {lat: 1.119897, lng: 104.048092}
    });

    let cities = [];
    let tempListTerminal = this.listTerminals;
    console.log(this.listTerminals);
    for(let i = 0; i < tempListTerminal.length; i++){
      var thisLng = parseFloat(tempListTerminal[i].lng)
      var thisLat = parseFloat(tempListTerminal[i].lat)
      cities.push({lat: thisLat, lng: thisLng});
    }
    console.log(cities)
  
    // Loop through cities, adding markers
    for (let i=0; i<cities.length; i++) {
      let position = cities[i]; // location of one city
      // create marker for a city
      let mk = new google.maps.Marker({position: position, map: this.map});
    }

    // Add Distance Matrix here
    const distanceMatricService = new google.maps.DistanceMatrixService(); // instantiate Distance Matrix service
    const matrixOptions = {
        origins: ["1.119897, 104.048092"], // technician locations
        destinations: ["1.129850, 104.054040"], // customer address
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC
    };

    // Call Distance Matrix service
    distanceMatricService.getDistanceMatrix(matrixOptions, callback);
    // Callback function used to process Distance Matrix response
    function callback(response, status) {
        if (status !== "OK") {
        alert("Error with distance matrix");
        return;
        }
        console.log(response);

        //asdsadsa
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
        // alert("The closest location is " + closest + " (" + drivetime + ")");
        // alert(drivetime + " time remaining");
        this.finalTime = drivetime;
        //asdas        
    }
    //end
  }

}

  

