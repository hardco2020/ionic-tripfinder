import { Component, OnInit } from '@angular/core';
import { ControllerserviceService, FavFoods, googleInfor } from '../../controllerservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-outcome-food',
  templateUrl: './outcome-food.page.html',
  styleUrls: ['./outcome-food.page.scss'],
})
export class OutcomeFoodPage implements OnInit {
  data: any;
  lock = 1; // update的鎖
  favfoods: FavFoods[]; // load進所有現存資料
  apiKey = 'AIzaSyCMjg0lGC43K_RsV687kghZ5qTAbPnQAMo';
  alldata: any[] = [];
  favfood: FavFoods = {
    img : '123',
    place: '測試',
    collection: 1
  };

  // Test data
  testData = [{
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
  },{ "Aid": 347, 
    Aname: "覓奇頂級日本料理高雄龍蝦和牛美食餐廳",
    photo: "CmRaAAAAEuZF2eY7_nJE5QKenLFrmXbPM7CPgBDrZwMJzt9y4GkbEDpaXHO5zRv69t2508OnFLgbw7ToA6d7KUnBoG0nME72ynaQPNI3DWxpODCfxsjM7KnPvcUkJYeFQ2AI-2flEhCuQXjeNSlLL0piGoGAKFbaGhRVD4LHj6iQP3XDdGFrWNp-DYNpGg",
    GoogleClass: "restaurant",
    Phone: "07 269 5111",
    Address: "802台灣高雄市苓雅區成功一路76號",
    Rate: 4.4,
    restaurant: 'y',
    vendor: "n", 
    fast_food: "n", 
    vegetarian_food: "y", 
    chinese: "y", 
    exotic: "n", 
    parity: "n",
    boxed_lunch: "n",
    baking: "n",
    seafood: "n",
    alcohol: "n",
    dessert: "n"
}];

  constructor(
    private route: ActivatedRoute,
    private sqliteDB: DbService,
    public service: ControllerserviceService,
    private loadingController: LoadingController
    ) {
    this.route.queryParams.subscribe(param => {
      if (param && param.special) {
        this.data = JSON.parse(param.special);
        console.log(this.data);
      }
    });
  }

  ngOnInit() {

    this.alldata = [{      //所有的data
      "Aid": 1,
      "Aname": "大立百貨空中遊樂園",
      "photo": "CmRaAAAAIClT_Ynie6i7diws5vPTvz4IK7-cyWX93fkUtbAnI2EkIORzchzhzZARIHaaF6vDQTx78ZEIEjNX55fzXE2v8aSZ2PArtcX8rP2a7JeimjeaerACyg9ftF37z6p0cBnwEhDEW3u4n-x7AeGI2F5ApFAsGhSFoyAOGS2JKfDqLSLgRjabwJKxyQ",
      "GoogleClass": "amusement_park",
      "Phone": "07 261 3060",
      "Address": "801台灣高雄市前金區五福三路59號RF",
      "Rate": 4.2
       },
       {
       "Aid": 2,
       "Aname": "澄清湖風景區 兒童樂園",
       "photo": "CmRaAAAAQNI4jsV8_g86CEU7tWjZQHtUOMN0mu3aL1sKekjMvWyGqCmyiz9miFN1v5WT6yoRh1KOIb_jmVK38p_Vfy60tcx8TI_hMJr9RQNSq-VtahYFp9OvIOGt5CGSssc_fyD0EhBpe0PveufVdBpENptCQqkqGhRd9VvD2vhgAxF_37fgh5eUlYENtw",
       "GoogleClass": "amusement_park",
       "Phone": "07 370 0821",
       "Address": "833台灣高雄市鳥松區",
       "Rate": 4
       },
       {
         "Aid": 3,
         "Aname": "鈴鹿賽道樂園",
         "photo": "CmRaAAAAG8PNms_SXLnkhz00HQX-67phd-iMq8tNWMXrV8Gsv_l_oaBzi04AqrZsN4cbbHiz3NynrvZU0hd0LnuJpFtj3YuH3Rtd9Z6bhN-3kiS63zMjLoPgunF8SNbpUDtjyqlMEhAyqYYRWyTYj5kKDW05xWOpGhTTJNhM9B8xsRScOXNXZI-rdnyaOA",
         "GoogleClass": "amusement_park",
         "Phone": "07 796 7766",
         "Address": "806台灣高雄市前鎮區中安路1-1號",
         "Rate": 4.3
       }
    ]
  }
  async presentLoading() { // 等待Sign
    const loading = await this.loadingController.create({
      message: '添加中',
      duration: 1000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  UpdateCollection(aname, photo, item) {
    this.lock = 0;
    this.favfood.place = aname;
    this.favfood.img = photo;
    this.favfoods.forEach(element => {
      if (element.place === this.favfood.place) { // 如果重複位置則UPDATE
        this.lock = 1;
        this.favfood.collection = element.collection + 1 ; // 新增一個收藏的人
        this.service.updateFavFoods(this.favfood, element.id).then(() => {
        });
      } else {
        // 如果位置沒重複則update (只會發生一次?) 當有兩個地點的時候
        // this.service.addFavorite(this.favorite).then(() => {
        // });
      }
    });
    if (this.lock === 0) {
      this.favfood.collection = 1;
      this.service.addFavFoods(this.favfood).then(() => {
      });
    }
  // 呼叫service的function  利用aname找資料庫
  // this.service.collect(aname)
    this.presentLoading();
    for (let i = 0; i < this.alldata.length; i++) {
     if (this.alldata[i] === item) {
       this.alldata.splice(i, 1);
    }
   }console.log(this.favfood);
  }
}
