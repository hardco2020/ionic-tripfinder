import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

import { SelectionPh1 } from '../selecting-phase1/selection-ph1';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-selecting-phase2',
  templateUrl: './selecting-phase2.page.html',
  styleUrls: ['./selecting-phase2.page.scss'],
})
export class SelectingPhase2Page implements OnInit {

  // 透過 url 將 selection 傳遞到此頁面
  data: any;
  constructor(public nav: NavController,private route: ActivatedRoute, private router: Router) { 
    this.route.queryParams.subscribe(param=>{
      if(param && param.special){
        this.data = JSON.parse(param.special);
      }
    });
  }

  // 多選項列表
  labels = [
    {
      title: '戶外',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      title: '室內',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      title: '動態',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      title: '靜態',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      title: '網美踩點',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      title: '文青必去',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      title: '靠山',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      title: '靠海',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      title: '逛街',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      title: '展覽',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      title: '名勝古蹟（歷史性）',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      title: '夜景',
      img: 'http://via.placeholder.com/300x300'
    }
  ];

  ngOnInit() {
    console.log(this.data);
  }
  turnpage(){   //換頁到 outcome
    // 跳轉頁面時透過 navigationExtras 傳遞 data 資料
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.data)
      }
    };
    this.nav.navigateRoot(['outcome'],navigationExtras);
  }

}
