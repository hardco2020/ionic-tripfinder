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

  
  labels = [
    {
      key: 1,
      name:'outdoor',
      title: '餐廳',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 2,
      name:'indoor',
      title: '小吃攤',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 3,
      name:'dynamic',
      title: '平價',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 4,
      name:'static',
      title: '素食',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 5,
      name:'netbeauty',
      title: '餐酒館',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 6,
      name:'hipster',
      title: '中式',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 7,
      name:'near_mountain',
      title: '異國料理',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 8,
      name:'near_sea',
      title: '日式',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 9,
      name:'shopping',
      title: '夜市',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 10,
      name:'exhibition',
      title: '當地特色',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 11,
      name:'historic_site',
      title: '素食',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 12,
      name:'night_view',
      title: '甜點',
      img: 'http://via.placeholder.com/300x300'
    }
  ];

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
