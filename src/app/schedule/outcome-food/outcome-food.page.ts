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
  example ="BOSTON龍蝦餐廳"; //到時候會改成所有地點的資料


  // Test data
  testData = [{
      "Aid": 343,
      "Aname": "長壽素食",
      "photo": "CmRaAAAAVTox-ql-A8z82Yhuub8fknfTeoXVDkRAn4Yf303F15pivWnpPGTqsLzpUR1ZmOu1V60MpjL6v0deO0sQUhQkLCkqvUTWaZt0D1iuJHXSJAIgL9E_YlqJy8WQNCg0hiGREhDobRFOB7IMfgtBHF2OLZiSGhRtm7cIzX8JHECzsPGdZtEq2MusWQ",
      "GoogleClass": "restaurant",
      "Phone": "07 336 3342",
      "Address": "802台灣高雄市苓雅區仁愛三街364號",
      "Rate": 4.3,
      "blog": "https://angelina619.pixnet.net/blog/post/16286503&sa=U&ved=2ahUKEwi1iK_koP_qAhWIEqYKHVCoC1kQFjAOegQIBxAB&usg=AOvVaw23jlhRhb3akzy3xl0DEKKx",
      "favorite": "n",
      "distance": 0,
      "sweet": "n",
      "salty": "y",
      "cheap": "n",
      "expensive": "n",
      "buffet": "n",
      "chinese": "y",
      "western": "n",
      "japanKorean": "n",
      "southeastAsian": "n",
      "netbeauty": "n",
      "vendor": "n",
      "restaurant": "y",
      "alcohol": "n"
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

  ngOnInit(): void{

    this.service.getFavFoods().subscribe(res => {
      this.favfoods = res; //接受firebase裡所有的欄位
    });
    this.favfood.place =this.example; //將地址存進等等要放進firebase的地址裡 
    // this.service.addFavorite(this.favorite).then(() => { 每次存都會需要先新增欄位，用此處來新增欄位
    // }); 

    var sql_func = 'SELECT * FROM FoodInfo WHERE sweet = "' + this.data.sweet +
                    '" AND salty = "' + this.data.salty +
                    '" AND cheap = "' + this.data.cheap +
                    '" AND expensive = "' + this.data.expensive +
                    '" AND buffet = "' + this.data.buffet +
                    '" AND chinese = "' + this.data.chinese +
                    '" AND western = "' + this.data.western +
                    '" AND japanKorean = "' + this.data.japanKorean +
                    '" AND southeastAsian = "' + this.data.southeastAsian +
                    '" AND netbeauty = "' + this.data.netbeauty +
                    '" AND vendor = "' + this.data.vendor +
                    '" AND restaurant = "' + this.data.restaurant +
                    '" AND alcohol = "' + this.data.alcohol +
                    '" AND favorite = "n"';

    var sql_text = "SELECT * FROM FoodInfo";// WHERE Aname = '義大遊樂世界聖托里尼山城'
    
    this.sqliteDB.getRestaurantsbycondition(sql_func).then(res => {
      this.alldata = res
    });
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

  UpdateCollection(aname, photo, item, aid) {
    this.lock = 0;
    this.favfood.place = aname;
    this.favfood.img = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+photo+"&key="+this.apiKey;
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
  this.sqliteDB.updateRestaurant(aid).then(() => {
  });
  // this.service.collect(aname)
    this.presentLoading();
    for (let i = 0; i < this.alldata.length; i++) {
     if (this.alldata[i] === item) {
       this.alldata.splice(i, 1);
    }
   }console.log(this.favfood);
  }
}
