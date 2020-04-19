import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

import { SelectionPh1 } from '../selecting-phase1/selection-ph1';
import { ActivatedRoute,Router } from '@angular/router';

import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'app-selecting-phase2',
  templateUrl: './selecting-phase2.page.html',
  styleUrls: ['./selecting-phase2.page.scss'],
})
export class SelectingPhase2Page implements OnInit {

  // 透過 url 將 selection 傳遞到此頁面
  data: any;
  selection: any;
  constructor(private fb: FormBuilder, public nav: NavController,private route: ActivatedRoute, private router: Router) { 
    this.route.queryParams.subscribe(param=>{
      if(param && param.special){
        this.data = JSON.parse(param.special);
      }
    });
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required])
    })
  }

  // 多選項列表
  labels = [
    {
      key: 1,
      name:'outdoor',
      title: '戶外',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 2,
      name:'indoor',
      title: '室內',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 3,
      name:'dynamic',
      title: '動態',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 4,
      name:'static',
      title: '靜態',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 5,
      name:'netbeauty',
      title: '網美踩點',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 6,
      name:'hipster',
      title: '文青必去',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 7,
      name:'near_mountain',
      title: '靠山',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 8,
      name:'near_sea',
      title: '靠海',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 9,
      name:'shopping',
      title: '逛街',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 10,
      name:'exhibition',
      title: '展覽',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 11,
      name:'historic_site',
      title: '名勝古蹟（歷史性）',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 12,
      name:'night_view',
      title: '夜景',
      img: 'http://via.placeholder.com/300x300'
    }
  ];
  form: FormGroup;

  ngOnInit() {
    console.log(this.data);
  }
  turnpage(){   //換頁到 outcome
    this.selection = Object.assign(this.data,this.form.value);
    // 跳轉頁面時透過 navigationExtras 傳遞 data 資料
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.selection)
      }
    };
    this.nav.navigateRoot(['outcome'],navigationExtras);
  }
  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;

    if (e.target.checked) { //如果有勾的話
      checkArray.push(new FormControl(e.target.value)); //push進array裡
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) { 
          checkArray.removeAt(i);  
          return;
        }
        i++;
      });
    }
  }
  submitForm() {
    console.log(this.form.value)
  }

}
