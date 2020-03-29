import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { from } from 'rxjs';
import { SelectionPh1 } from './selection-ph1';
import { NavigationExtras } from '@angular/router';

import { SelectFormService } from '../select-form.service';
@Component({
  selector: 'app-selecting-phase1',
  templateUrl: './selecting-phase1.page.html',
  styleUrls: ['./selecting-phase1.page.scss'],
})
export class SelectingPhase1Page implements OnInit {

  constructor(public nav: NavController, private selectform: SelectFormService) { } //宣告nav函數來換頁
  private selection : SelectionPh1;


  ngOnInit() {
    this.getSelectForm();
  }
  
  // ngModel 變數值
  vals :any = [];
  items: any;
  // 取得表單資料
  getSelectForm(){
    this.items = this.selectform.getSelectForm();
  }

  // 設定 selection 的值
  setItem(){  
    this.selection = {
      distance: this.vals[0],
      transportation: this.vals[1],
      period: this.vals[2],
      amount: this.vals[3]
    };
  }
  turnpage(){   //換頁到phase2
    this.setItem();
    // 跳轉頁面時透過 navigationExtras 傳遞 selection 資料
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.selection)
      }
    };
    this.nav.navigateRoot(['selecting-phase2'],navigationExtras);
  }
}
