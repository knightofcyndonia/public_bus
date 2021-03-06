import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< HEAD
// import {listofTerminals} from '../data/list-terminals';
import { TerminalService } from '../services/terminal.service';
import { UtilsService } from '../services/utils.service';
import * as $ from 'jquery';
=======
import {listofTerminals} from '../data/list-terminals';
import { TerminalService } from '../services/terminal.service';
import { UtilsService } from '../services/utils.service';
>>>>>>> 631977655b516267b5049fad5886dca2633d67e5


@Component({
  selector: 'app-find-location',
  templateUrl: './find-location.page.html',
  styleUrls: ['./find-location.page.scss'],
})
export class FindLocationPage implements OnInit {
  listTerminals : any = [];
<<<<<<< HEAD
  listTerminalsForDestination : any = [];
  isItemAvailable = false;
  items = [];
  txtIdTerminalSource = '';
  txtIdTerminalDest = '';

  txtTerminalSource = '';
  txtTerminalDest = '';

  
  public goalListSourceTerminal: any = [];
  public loadedGoalListSourceTerminal: any = [];

  
  public goalListDestTerminal: any = [];
  public loadedGoalListDestTerminal: any = [];
=======
  isItemAvailable = false;
  items = [];
  idTerminalDest = '';
  idTerminalSource = '';
>>>>>>> 631977655b516267b5049fad5886dca2633d67e5

  constructor(
    private router: Router,
    private terminalService: TerminalService,
    private utils: UtilsService
<<<<<<< HEAD
    ) 
    { 
    }

  ngOnInit() {
    this.getData();
  }
  
  ionViewWillEnter() {
    this.getData();
  }

  initializeItems(){
    this.goalListSourceTerminal = this.loadedGoalListSourceTerminal;
=======
    ) { }

  ngOnInit() {
    this.listTerminals = listofTerminals;
>>>>>>> 631977655b516267b5049fad5886dca2633d67e5
  }

  goHomePage(){
    this.router.navigate(['/home/']);
  }

<<<<<<< HEAD
  selectedSourceTerminal(evt) {
    this.initializeItems();
    $("#terminalListSource").show();
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.goalListSourceTerminal = this.goalListSourceTerminal.filter(currentGoal => {
      if (currentGoal.terminal_name && searchTerm) {
        if (currentGoal.terminal_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  selectedDestTerminal(evt) {
    this.initializeItems();
    $("#terminalListDest").show();
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.goalListDestTerminal = this.goalListDestTerminal.filter(currentGoal => {
      if (currentGoal.terminal_name && searchTerm) {
        if (currentGoal.terminal_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

  }

  fnSelectSource(terminalId, terminalName) 
  {
    this.txtTerminalSource = terminalName;
    this.txtIdTerminalSource = terminalId;
    $("#terminalListSource").hide();

    //Set list to default
    this.goalListDestTerminal = this.goalListSourceTerminal;

    //remove item when id had been choosen before.
    let newList = [];
    newList = this.goalListDestTerminal.filter(x => {
      return x.id != terminalId;
    });
    //new list for search destination terminal
    this.goalListDestTerminal = newList;

    //validation when choose the same location
    if(terminalId === this.txtIdTerminalDest)
    {
      this.txtIdTerminalDest = '';
      this.txtTerminalDest = '';
    }
    //end of validation
  }

  fnSelectDest(terminalId, terminalName) 
  {
    this.txtTerminalDest = terminalName;
    this.txtIdTerminalDest = terminalId;
    $("#terminalListDest").hide();
  }

  goFilterBus()
  {
    console.log("idTerminalDest = " + this.txtIdTerminalDest);
    console.log("idTerminalSource = " + this.txtIdTerminalSource);

    const urlParam = this.txtIdTerminalSource+"&&"+this.txtIdTerminalDest;
    this.router.navigate(['/terminal-detail/'+urlParam]);
=======
  goFilterBus()
  {
    console.log("idTerminalDest = " + this.idTerminalDest);
    console.log("idTerminalSource = " + this.idTerminalSource);

    const urlParam = this.idTerminalSource+"&&"+this.idTerminalDest;
    this.router.navigate(['/terminal-detail/'+urlParam]);
  }


  initializeItems(){
    // this.listTerminals = ["Ram","gopi", "dravid"];
  }

  ionViewWillEnter() {
    this.getData();
>>>>>>> 631977655b516267b5049fad5886dca2633d67e5
  }
  
  getData(){
    this.terminalService.getAllTerminals().subscribe(
      (response) => {
        console.log(response);
        this.listTerminals = response;
<<<<<<< HEAD
        this.goalListSourceTerminal = response;
        this.loadedGoalListSourceTerminal = response;

        this.goalListDestTerminal = response;
        this.loadedGoalListDestTerminal = response;
=======
>>>>>>> 631977655b516267b5049fad5886dca2633d67e5
      },
      (err) => {
        this.listTerminals = [];
        console.log(JSON.stringify(err));
        this.utils.showToast("Terjadi Kesalahan");
      }
      )
  }

<<<<<<< HEAD
=======
  doRefresh(event) {
    this.getData();
    setTimeout(() => {
    event.target.complete();
    }, 1000);
    }

>>>>>>> 631977655b516267b5049fad5886dca2633d67e5
}
