import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionPh1 } from '../selecting-phase1/selection-ph1';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-selecting-food1',
  templateUrl: './selecting-food1.page.html',
  styleUrls: ['./selecting-food1.page.scss'],
})
export class SelectingFood1Page implements OnInit {
  ishidden1 = true; //控制欄位
  ishidden2 = true; //控制欄位
  ishidden3 = true; //控制欄位
  data: any;
  selection: any;
  constructor(private fb: FormBuilder, public nav: NavController, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(param => {
      if (param && param.special) {
        this.data = JSON.parse(param.special);
        console.log(this.data)
      }
    });
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required])
    });
  }

  distanceRange: any;
  distanceValid: boolean = false;
  items: any;
  form: FormGroup;

  result = {
  };

  labels1 = [
    {
      key: 3,
      name: 'hotpot',
      title: '#火鍋',
      
    },
    {
      key: 4,
      name: 'dessert',
      title: '#甜點',
    },
    {
      key: 5,
      name: 'snack',
      title: '#小吃',
    },
    {
      key: 7,
      name: 'cake',
      title: '#蛋糕',
    },
    {
      key: 8,
      name: 'coffee',
      title: '#咖啡',
    },
    {
      key: 9,
      name: 'bar',
      title: '#餐酒館/酒吧',
    },
    {
      key: 10,
      name: 'steak',
      title: '#牛排',
    },
    {
      key: 11,
      name: 'barbeque',
      title: '#燒烤',
    },
    {
      key: 12,
      name: 'japenesebar',
      title: '#居酒屋',
    },
    {
      key: 13,
      name: 'beverage',
      title: '#冰品飲料',
    },
    {
      key: 14,
      name: 'banquet',
      title: '#合菜',
    },
    {
      key: 16,
      name: 'seafood',
      title: '#海鮮',
    },
    {
      key: 17,
      name: 'ramen',
      title: '#拉麵',
    },
    {
      key: 18,
      name: 'beefnoodle',
      title: '#牛肉麵',
    },
    {
      key: 19,
      name: 'sushi',
      title: '#壽司',
    },
    {
      key: 20,
      name: 'vegetarian',
      title: '#素食',
    },
  ]
  labels2 = [
    {
      key: 1,
      name: 'japenese',
      title: '#日式料理',
    },
    {
      key: 2,
      name: 'korean',
      title: '#韓式料理',
    },
    {
      key: 3,
      name: 'chinese',
      title: '#中式料理',
    },
    {
      key: 4,
      name: 'american',
      title: '#美式料理',
    },
    {
      key: 5,
      name: 'italian',
      title: '#義式料理',
    },
    {
      key: 6,
      name: 'taifood',
      title: '#泰式料理',
    },
    {
      key: 7,
      name: 'honkong',
      title: '#港式料理',
    }
  ]
  labels3 = [
    {
      key: 6,
      name: 'date',
      title: '#約會餐廳',
    },
    {
      key: 1,
      name: 'petfriendly',
      title: '#寵物友善',
    },
    {
      key: 2,
      name: 'breakfast',
      title: '#早餐',
    },
    {
      key: 3,
      name: 'lunch',
      title: '#午餐',
    },
    {
      key: 4,
      name: 'dinner',
      title: '#晚餐',
    },
    {
      key: 5,
      name: 'brunch',
      title: '#早午餐',
    },
    {
      key: 15,
      name: 'latenight',
      title: '#宵夜',
    }
  ]
  ngOnInit() {
    console.log(this.data);
  }

  // 設定 selection 的值
  setItem() {
    this.selection = {
      distance: this.distanceRange,
    };
  }

  ionChange() {
    if (this.distanceRange > 0) {
      this.distanceValid = true;
    } else {
      this.distanceValid = false;
    }
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    if (e.target.checked) { // 如果有勾的話
      checkArray.push(new FormControl(e.target.value)); // push進array裡
      this.result[e.target.value] = 'y';

      console.log(this.result)
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          checkArray.removeAt(i);
          this.result[e.target.value] = 'n';
          return;
        }
        i++;
      });
    }
  }

  turnpage() {
    this.selection = Object.assign(this.data, this.result);
    // 跳轉頁面時透過 navigationExtras 傳遞 selection 資料
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.selection)
      }
    };
    this.nav.navigateRoot(['tabs/tab1/outcome-food'], navigationExtras);
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
  submitForm() {
    console.log(this.form.value);
  }
}
