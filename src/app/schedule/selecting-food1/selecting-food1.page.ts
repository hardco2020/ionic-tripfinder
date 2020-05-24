import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-selecting-food1',
  templateUrl: './selecting-food1.page.html',
  styleUrls: ['./selecting-food1.page.scss'],
})
export class SelectingFood1Page implements OnInit {

  constructor(public nav: NavController) { } //宣告nav函數來換頁
  private selection : any;

  ngOnInit() {
  }
  
  // ngModel 變數值
  distanceRange:any;
  distanceValid:boolean = false;
  items: any;

  // 設定 selection 的值
  setItem(){  
    this.selection = {
      distance: this.distanceRange,
    };
  }
  ionChange(){
    if(this.distanceRange>0){
      this.distanceValid=true;
    }else{
      this.distanceValid=false;
    }
  }
  turnpage(){   //換頁到phase2
    this.setItem();
    // 跳轉頁面時透過 navigationExtras 傳遞 selection 資料
   /* let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.selection)
      }
    };
    this.nav.navigateRoot(['selecting-phase2'],navigationExtras);*/
  }
}
