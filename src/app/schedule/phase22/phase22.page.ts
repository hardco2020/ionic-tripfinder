import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

import { SelectionPh1 } from '../selecting-phase1/selection-ph1';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ValueTransformer } from '@angular/compiler/src/util';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-phase22',
  templateUrl: './phase22.page.html',
  styleUrls: ['./phase22.page.scss'],
})
export class Phase22Page  {
  data: any;
  selection: any;
  //記得要使用formbuilder前要在本頁的module裡加上reactform module
  constructor(public fb: FormBuilder , public nav: NavController, private route: ActivatedRoute, private router: Router) {
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
  labels = [
    {
      key: 5,
      name:'netbeauty',
      title: '網美踩點',
      img: 'assets/img/selecting_phase/5.jpeg'
      // img: 'https://images.pexels.com/photos/600114/pexels-photo-600114.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 6,
      name:'hipster',
      title: '文青必去',
      img: 'assets/img/selecting_phase/6.jpeg'
      // img: 'https://images.pexels.com/photos/364110/pexels-photo-364110.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 7,
      name:'near_mountain',
      title: '靠山',
      img: 'assets/img/selecting_phase/7.jpeg'
      // img: 'https://images.pexels.com/photos/2175952/pexels-photo-2175952.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 8,
      name:'near_sea',
      title: '靠海',
      img: 'assets/img/selecting_phase/8.jpeg'
      // img: 'https://images.pexels.com/photos/756856/pexels-photo-756856.jpeg?auto=compress&cs=tinysrgb'
    },
    // {
    //   key: 9,
    //   name:'shopping',
    //   title: '逛街',
    //   img: 'assets/img/selecting_phase/9.jpeg'
    //   // img: 'https://images.pexels.com/photos/1020370/pexels-photo-1020370.jpeg?auto=compress&cs=tinysrgb'
    // },
    // {
    //   key: 10,
    //   name:'exhibition',
    //   title: '展覽',
    //   img: 'assets/img/selecting_phase/10.jpeg'
    //   // img: 'https://images.pexels.com/photos/1718856/pexels-photo-1718856.jpeg?auto=compress&cs=tinysrgb'
    // },
    // {
    //   key: 11,
    //   name:'historic_site',
    //   title: '名勝古蹟',
    //   img: 'assets/img/selecting_phase/11.jpeg'
    //   // img: 'https://images.pexels.com/photos/3361480/pexels-photo-3361480.jpeg?auto=compress&cs=tinysrgb'
    // },
    // {
    //   key: 12,
    //   name:'night_view',
    //   title: '夜景',
    //   img: 'assets/img/selecting_phase/12.jpeg'
    //   // img: 'https://images.pexels.com/photos/2670898/pexels-photo-2670898.jpeg?auto=compress&cs=tinysrgb'
    // }
  ];
  form: FormGroup;
  result = {   //用來檢查checkbox的結果
    indoor : "n",
    outdoor : "n",
    static  : "n",
    dynamic : "n",
    netbeauty:"n",
    hipster:"n", 
    near_mountain:"n",
    near_sea:"n",
    shopping:"n",
    exhibition:"n",
    historic_site:"n",
    night_view:"n",
  };
  ngOnInit() {
    this.result.indoor = this.data.indoor;
    this.result.outdoor = this.data.outdoor;
    this.result.static = this.data.static;
    this.result.dynamic = this.data.dynamic;
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
    this.nav.navigateRoot(['phase23'],navigationExtras);
  }
  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;

    if (e.target.checked) { //如果有勾的話
      checkArray.push(new FormControl(e.target.value)); //push進array裡
      this.result[e.target.value]="y";
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) { 
          checkArray.removeAt(i);  
          // this.result[e.target.value]="n";
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
