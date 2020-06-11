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
  data: any;
  selection: any;
  constructor(private fb: FormBuilder, public nav: NavController, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(param => {
      if (param && param.special) {
        this.data = JSON.parse(param.special);
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
    restaurant: 'n',
    vendor: 'n',
    fast_food: 'n',
    vegetarian_food: 'n',
    chinese: 'n',
    exotic: 'n',
    parity: 'n',
    boxed_lunch: 'n',
    baking: 'n',
    seafood: 'n',
    alcohol: 'n',
    dessert: 'n',
  };

  labels = [
    {
      key: 1,
      name: 'restaurant',
      title: '餐廳',
      img: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 2,
      name: 'vendor',
      title: '攤販',
      img: 'https://images.pexels.com/photos/3031209/pexels-photo-3031209.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 3,
      name: 'fast_food',
      title: '速食',
      img: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 4,
      name: 'vegetarian_food',
      title: '素食',
      img: 'https://images.pexels.com/photos/4050981/pexels-photo-4050981.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 5,
      name: 'chinese',
      title: '中式',
      img: 'https://images.pexels.com/photos/2670327/pexels-photo-2670327.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 6,
      name: 'exotic',
      title: '異國料理',
      img: 'https://images.pexels.com/photos/3951665/pexels-photo-3951665.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 7,
      name: 'parity',
      title: '平價',
      img: 'https://images.pexels.com/photos/3459343/pexels-photo-3459343.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 8,
      name: 'boxed_lunch',
      title: '便當',
      img: 'https://images.pexels.com/photos/3297363/pexels-photo-3297363.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 9,
      name: 'baking',
      title: '烘培',
      img: 'https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb'
    },
    {
      key: 10,
      name: 'seafood',
      title: '海鮮',
      img: 'https://images.pexels.com/photos/2871757/pexels-photo-2871757.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 11,
      name: 'alcohol',
      title: '酒精',
      img: 'https://images.pexels.com/photos/2529468/pexels-photo-2529468.jpeg?auto=compress&cs=tinysrgb'
    },
    {
      key: 12,
      name: 'dessert',
      title: '甜點',
      img: 'https://images.pexels.com/photos/2373520/pexels-photo-2373520.jpeg?auto=compress&cs=tinysrgb'
    }
  ];

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
    this.setItem();
    // 跳轉頁面時透過 navigationExtras 傳遞 selection 資料
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.selection)
      }
    };
    this.nav.navigateRoot(['outcome-food'], navigationExtras);
  }

  submitForm() {
    console.log(this.form.value);
  }
}
