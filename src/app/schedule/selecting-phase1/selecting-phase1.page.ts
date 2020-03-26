import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-selecting-phase1',
  templateUrl: './selecting-phase1.page.html',
  styleUrls: ['./selecting-phase1.page.scss'],
})
export class SelectingPhase1Page implements OnInit {

  constructor(public nav: NavController) { } //宣告nav函數來換頁

  ngOnInit() {
  }
  turnpage(){   //換頁到phase2
    this.nav.navigateRoot(['selecting-phase2']);
  }
}
