import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-outcome-food',
  templateUrl: './outcome-food.page.html',
  styleUrls: ['./outcome-food.page.scss'],
})
export class OutcomeFoodPage implements OnInit {
  data: any;
  map;
  apiKey = 'AIzaSyCMjg0lGC43K_RsV687kghZ5qTAbPnQAMo';

  // Test data
  allData = [{
    Aid: 1,
    Aname: 'BOSTON龍蝦餐廳',
    photo: 'CmRaAAAAbVnCkRTNYh48Uxq2IH5YNHuIaYGSS9SMu_tFvP2l90PJKm9amCRFCAHKmix37GseM8SDLVIXTPmdGoGFcgzBAgLNRULnN9uDdT_ZEMVFWqu2STNVaK87I4wJZGDMHAkDEhDOCwzwLMTw5TESrrLv380qGhREsJlfL1M62FnmPF-tXttDMYu2Vw',
    GoogleClass: 'restaurant',
    Phone: '07 235 0101',
    Address: '800台灣高雄市新興區民族二路121號',
    Rate: 4.3,
    restaurant: 'y',
    vendor: 'n',
    fast_food: 'n',
    vegetarian_food: 'n',
    chinese: 'n',
    exotic: 'y',
    parity: 'y',
    boxed_lunch: 'n',
    baking: 'n',
    seafood: 'y',
    alcohol: 'y',
    dessert: 'y',
    favorite: 'n'
  }];

  constructor() { }

  ngOnInit() {
  }

}
