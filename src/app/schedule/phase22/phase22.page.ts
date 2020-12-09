import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

import { SelectionPh1 } from '../selecting-phase1/selection-ph1';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ValueTransformer } from '@angular/compiler/src/util';
import { throwError } from 'rxjs';
import { ControllerserviceService,Favorites,TouristData,googleInfor } from '../../controllerservice.service'

@Component({
  selector: 'app-phase22',
  templateUrl: './phase22.page.html',
  styleUrls: ['./phase22.page.scss'],
})
export class Phase22Page  {
  ishidden1 = true; //控制欄位
  ishidden2 = true; //控制欄位
  ishidden3 = true; //控制欄位
  ishidden4 = true; //控制欄位
  counter = 0 ; //防止一次勾太多
  data: any;
  selection: any;
  testdata: any
  //記得要使用formbuilder前要在本頁的module裡加上reactform module
  constructor(public fb: FormBuilder , public nav: NavController, private route: ActivatedRoute, private router: Router,public service : ControllerserviceService, ) {
    this.route.queryParams.subscribe(param=>{
      if(param && param.special){
        this.data = JSON.parse(param.special);
        console.log(this.data);
      }
    });
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required])
    });  
  }
  labels1 = [
    {
      key: 1,
      name:'hipster',
      title: '#文青必訪',
      img: 'assets/img/selecting_phase/5.jpeg'
      // img: 'https://images.pexels.com/photos/600114/pexels-photo-600114.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 4,
      name:'historic',
      title: '#古蹟巡遊',
      img: 'assets/img/selecting_phase/8.jpeg'
      // img: 'https://images.pexels.com/photos/756856/pexels-photo-756856.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 5,
      name:'latern',
      title: '#台灣燈會',
      img: 'assets/img/selecting_phase/8.jpeg'
      // img: 'https://images.pexels.com/photos/756856/pexels-photo-756856.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 6,
      name:'tourbus',
      title: '#台灣觀巴',
      img: 'assets/img/selecting_phase/8.jpeg'
      // img: 'https://images.pexels.com/photos/756856/pexels-photo-756856.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 12,
      name:'temple',
      title: '#寺廟祈福',
    },
    {
      key: 17,
      name:'exhibition',
      title: '#看展覽',
    },
    {
      key: 26,
      name:'oldstreet',
      title: '#逛老街',
      img: 'assets/img/selecting_phase/8.jpeg'
      // img: 'https://images.pexels.com/photos/756856/pexels-photo-756856.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 28,
      name:'tribetour',
      title: '#部落旅遊',
      img: 'assets/img/selecting_phase/8.jpeg'
      // img: 'https://images.pexels.com/photos/756856/pexels-photo-756856.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 29,
      name:'museum',
      title: '#博物館',
      img: 'assets/img/selecting_phase/8.jpeg'
      // img: 'https://images.pexels.com/photos/756856/pexels-photo-756856.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 32,
      name:'barrierfree',
      title: '#無障礙',
      img: 'assets/img/selecting_phase/8.jpeg'
      // img: 'https://images.pexels.com/photos/756856/pexels-photo-756856.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 34,
      name:'hakka',
      title: '#漫遊客庄',
      img: 'assets/img/selecting_phase/8.jpeg'
      // img: 'https://images.pexels.com/photos/756856/pexels-photo-756856.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 41,
      name:'art',
      title: '#藝術',
      img: 'assets/img/selecting_phase/12.jpeg'
      // img: 'https://images.pexels.com/photos/2670898/pexels-photo-2670898.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 42,
      name:'railway',
      title: '#鐵道旅遊',
      img: 'assets/img/selecting_phase/12.jpeg'
      // img: 'https://images.pexels.com/photos/2670898/pexels-photo-2670898.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 38,
      name:'battlefield',
      title: '#戰地文化',
      img: 'assets/img/selecting_phase/9.jpeg'
      // img: 'https://images.pexels.com/photos/1020370/pexels-photo-1020370.jpeg?auto=compress&cs=tinysrgb'
    },
  ]
  labels2 = [
    {
      key: 2,
      name:'watersport',
      title: '#水上活動',
      img: 'assets/img/selecting_phase/6.jpeg'
      // img: 'https://images.pexels.com/photos/364110/pexels-photo-364110.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 3,
      name:'themepark',
      title: '#主題樂園',
      img: 'assets/img/selecting_phase/7.jpeg'
      // img: 'https://images.pexels.com/photos/2175952/pexels-photo-2175952.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 7,
      name:'mustbuy',
      title: '#必買',
    },
    {
      key: 8,
      name:'hotspot',
      title: '#打卡熱點',
    },
    {
      key: 19,
      name:'summer',
      title: '#夏天戲水',
      img: 'assets/img/selecting_phase/8.jpeg'
      // img: 'https://images.pexels.com/photos/756856/pexels-photo-756856.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 20,
      name:'date',
      title: '#浪漫約會',
      img: 'assets/img/selecting_phase/8.jpeg'
      // img: 'https://images.pexels.com/photos/756856/pexels-photo-756856.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 30,
      name:'biketour',
      title: '#單車旅遊',
      img: 'assets/img/selecting_phase/8.jpeg'
      // img: 'https://images.pexels.com/photos/756856/pexels-photo-756856.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 35,
      name:'kol',
      title: '#網美必拍',
      img: 'assets/img/selecting_phase/8.jpeg'
      // img: 'https://images.pexels.com/photos/756856/pexels-photo-756856.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 40,
      name:'familyfriendly',
      title: '#親子共遊',
      img: 'assets/img/selecting_phase/11.jpeg'
      // img: 'https://images.pexels.com/photos/3361480/pexels-photo-3361480.jpeg?auto=compress&cs=tinysrgb'
    },
  ]
  labels3 =[
    {
      key: 9,
      name:'creature',
      title: '#生態體驗',
    },
    {
      key: 11,
      name:'weirdscene',
      title: '#地質奇觀',
    },
  
    {
      key: 13,
      name:'weddingdress',
      title: '#婚紗拍攝',
    },
    {
      key: 14,
      name:'hotspring',
      title: '#泡溫泉',
    },
    {
      key: 15,
      name:'dawn',
      title: '#迎曙光',
    },
    {
      key: 18,
      name:'seaview',
      title: '#看海景',
    },
    
    {
      key: 21,
      name:'seabay',
      title: '#海灣旅遊',
      img: 'assets/img/selecting_phase/8.jpeg'
      // img: 'https://images.pexels.com/photos/756856/pexels-photo-756856.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 22,
      name:'sunset',
      title: '#夕陽',
      img: 'assets/img/selecting_phase/8.jpeg'
      // img: 'https://images.pexels.com/photos/756856/pexels-photo-756856.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 23,
      name:'nationalpark',
      title: '#國家公園',
      img: 'assets/img/selecting_phase/8.jpeg'
      // img: 'https://images.pexels.com/photos/756856/pexels-photo-756856.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 24,
      name:'nationalscenic',
      title: '#國家風景區',
      img: 'assets/img/selecting_phase/8.jpeg'
      // img: 'https://images.pexels.com/photos/756856/pexels-photo-756856.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 25,
      name:'nationalforest',
      title: '#國家森林遊樂區',
      img: 'assets/img/selecting_phase/8.jpeg'
      // img: 'https://images.pexels.com/photos/756856/pexels-photo-756856.jpeg?auto=compress&cs=tinysrgb'
    },
   
    {
      key: 31,
      name:'foresttrail',
      title: '#森林步道',
      img: 'assets/img/selecting_phase/8.jpeg'
      // img: 'https://images.pexels.com/photos/756856/pexels-photo-756856.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 33,
      name:'moutaintrail',
      title: '#登山步道',
      img: 'assets/img/selecting_phase/8.jpeg'
      // img: 'https://images.pexels.com/photos/756856/pexels-photo-756856.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 35,
      name:'kol',
      title: '#網美必拍',
      img: 'assets/img/selecting_phase/8.jpeg'
      // img: 'https://images.pexels.com/photos/756856/pexels-photo-756856.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 36,
      name:'nightview',
      title: '#賞夜景',
      img: 'assets/img/selecting_phase/8.jpeg'
      // img: 'https://images.pexels.com/photos/756856/pexels-photo-756856.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 37,
      name:'flowerview',
      title: '#賞花',
      img: 'assets/img/selecting_phase/8.jpeg'
      // img: 'https://images.pexels.com/photos/756856/pexels-photo-756856.jpeg?auto=compress&cs=tinysrgb'
    },
    
    {
      key: 39,
      name:'lighthouse',
      title: '#燈塔',
      img: 'assets/img/selecting_phase/10.jpeg'
      // img: 'https://images.pexels.com/photos/1718856/pexels-photo-1718856.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 43,
      name:'viewingplatform',
      title: '#觀景平台',
      img: 'assets/img/selecting_phase/12.jpeg'
      // img: 'https://images.pexels.com/photos/2670898/pexels-photo-2670898.jpeg?auto=compress&cs=tinysrgb'
    }
  ]
  labels4 =[
    {
      key: 27,
      name:'nightstreet',
      title: '#逛夜市',
      img: 'assets/img/selecting_phase/8.jpeg'
      // img: 'https://images.pexels.com/photos/756856/pexels-photo-756856.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 16,
      name:'musteat',
      title: '#非吃不可',
    },
    {
      key: 10,
      name:'seafood',
      title: '#吃海鮮',
    }
  ]
  form: FormGroup;
  result = {   //用來檢查checkbox的結果
    // indoor : "n",
    // outdoor : "n",
    // static  : "n",
    // dynamic : "n",
    // netbeauty:"n",
    // hipster:"n", 
    // near_mountain:"n",
    // near_sea:"n",
    // shopping:"n",
    // exhibition:"n",
    // historic_site:"n",
    // night_view:"n",
  };
  ngOnInit() {
    // this.result.indoor = this.data.indoor;
    // this.result.outdoor = this.data.outdoor;
    // this.result.static = this.data.static;
    // this.result.dynamic = this.data.dynamic;
    // console.log(this.data);    
  }
  turnpage(){   //換頁到 outcome
    this.selection = Object.assign(this.data,this.result);
    // 跳轉頁面時透過 navigationExtras 傳遞 data 資料
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.selection)
      }
    };
    this.nav.navigateRoot(['tabs/tab1/outcome'],navigationExtras);
  }
  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    if (e.target.checked) { //如果有勾的話
      checkArray.push(new FormControl(e.target.value)); //push進array裡
      this.result[e.target.value]="y";
      console.log(this.result)
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) { 
          checkArray.removeAt(i);  
          this.result[e.target.value]="n";
          return;
        }
        i++;
      });
    }
  }
  unhidden1(){ //點出隱藏欄位1
    if(this.ishidden1==true){
      this.ishidden1 = false;
    }
    else{
      this.ishidden1 = true;
    }
  }
  unhidden2(){ //點出隱藏欄位2
    if(this.ishidden2==true){
      this.ishidden2 = false;
    }
    else{
      this.ishidden2 = true;
    }
  }
  unhidden3(){ //點出隱藏欄位2
    if(this.ishidden3==true){
      this.ishidden3 = false;
    }
    else{
      this.ishidden3 = true;
    }
  }
  unhidden4(){ //點出隱藏欄位2
    if(this.ishidden4==true){
      this.ishidden4 = false;
    }
    else{
      this.ishidden4 = true;
    }
  }
  lastpage(){
    this.nav.navigateRoot(['tabs/tab1/selecting-phase1']);
  }
  submitForm() { 
    console.log(this.form.value)
  }
}
