import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {listofTerminals} from '../data/list-terminals';
import { TerminalService } from '../services/terminal.service';
import { UtilsService } from '../services/utils.service';


@Component({
  selector: 'app-find-location',
  templateUrl: './find-location.page.html',
  styleUrls: ['./find-location.page.scss'],
})
export class FindLocationPage implements OnInit {
  listTerminals : any = [];
  isItemAvailable = false;
  items = [];
  idTerminalDest = '';
  idTerminalSource = '';

  constructor(
    private router: Router,
    private terminalService: TerminalService,
    private utils: UtilsService
    ) { }

  ngOnInit() {
    this.listTerminals = listofTerminals;
  }

  goHomePage(){
    this.router.navigate(['/home/']);
  }

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
  }
  
  getData(){
    this.terminalService.getAllTerminals().subscribe(
      (response) => {
        console.log(response);
        this.listTerminals = response;
      },
      (err) => {
        this.listTerminals = [];
        console.log(JSON.stringify(err));
        this.utils.showToast("Terjadi Kesalahan");
      }
      )
  }

  doRefresh(event) {
    this.getData();
    setTimeout(() => {
    event.target.complete();
    }, 1000);
    }

}
