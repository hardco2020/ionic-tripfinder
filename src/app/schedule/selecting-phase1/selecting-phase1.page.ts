import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { from } from 'rxjs';
import { SelectionPh1 } from './selection-ph1';
import { NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-selecting-phase1',
  templateUrl: './selecting-phase1.page.html',
  styleUrls: ['./selecting-phase1.page.scss'],
})
export class SelectingPhase1Page implements OnInit {

  constructor(public nav: NavController) { } //宣告nav函數來換頁
  distance: any;
  transportion: string;
  period: string;
  amount: any;
  private selection :any;

  ngOnInit() {
  }
  setItem(){
    
    this.selection ={
      distance: this.distance,
      transportation: this.transportion,
      period: this.period,
      amount: this.amount
    };
  }
  turnpage(){   //換頁到phase2
    this.setItem();
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.selection)
      }
    };
    this.nav.navigateRoot(['selecting-phase2'],navigationExtras);
  }
}
