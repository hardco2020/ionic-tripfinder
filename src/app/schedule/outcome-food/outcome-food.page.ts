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
  },{
    Aid: 2,
    Aname: '貳樓餐廳 Second Floor Cafe 高雄店',
    photo: 'CmRaAAAA4caQCokTxmMKfmg6PoacfVPMkx3JZNxxaNmj1Wt4crzJM69N4Ogz6yurkV_sfcj1fIH9qXD_SwcI0w-lSxw-JmNDWG222gp6mzMv05TvgPyP1Q3UTS8onMS2h5zGYcvqEhAanRKuGiMzYu5zGVVWLPytGhRJl4rotJhsh3r27PWa2650csmeQQ',
    GoogleClass: 'restaurant',
    Phone: '07 791 9222',
    Address: '806台灣高雄市前鎮區中安路1 之1號二樓',
    Rate: 4.3,
    restaurant: 'y',
    vendor: 'n',
    fast_food: 'n',
    vegetarian_food: 'n',
    chinese: 'n',
    exotic: 'y',
    parity: 'n',
    boxed_lunch: 'n',
    baking: 'n',
    seafood: 'y',
    alcohol: 'y',
    dessert: 'y',
    favorite: 'n'
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

<<<<<<< HEAD
    var sql_func = 'SELECT * FROM FoodInfo WHERE sweet = "' + this.data.sweet +
                    '" AND salty = "' + this.data.salty +
                    '" AND cheap = "' + this.data.cheap +
                    '" AND expensive = "' + this.data.expensive +
                    '" AND buffet = "' + this.data.buffet +
                    '" AND chinese = "' + this.data.chinese + 
                    '" AND western = "' + this.data.western +
                    '" AND japanKorean = "' + this.data.japanKorean +
                    '" AND SoutheastAsian = "' + this.data.SoutheastAsian +
                    '" AND netbeauty = "' + this.data.netbeauty +
                    '" AND vendor = "' + this.data.vendor +
                    '" AND restaurant = "' + this.data.restaurant +
                    '" AND alcohol = "' + this.data.alcohol +
                    '" AND favorite = "n"';
=======
    const sweet = this.data.sweet;
    const salty = this.data.salty;
    const cheap = this.data.cheap;
    const expensive = this.data.expensive;
    const buffet = this.data.buffet;
    const chinese = this.data.chinese;
    const western = this.data.western;
    const japanKorean = this.data.japanKorean;
    const southeastAsian = this.data.southeastAsian;
    const netbeauty = this.data.netbeauty;
    const vendor = this.data.vendor;
    const restaurant = this.data.restaurant;
    const alcohol = this.data.alcohol;
  
    // var sql_func = 'SELECT * FROM FoodInfo WHERE sweet = "' + sweet +
    //                 '" AND salty = "' + salty +
    //                 '" AND cheap = "' + cheap +
    //                 '" AND expensive = "' + expensive +
    //                 '" AND buffet = "' + buffet +
    //                 '" AND chinese = "' + chinese +
    //                 '" AND western = "' + western +
    //                 '" AND japanKorean = "' + japanKorean +
    //                 '" AND southeastAsian = "' + southeastAsian +
    //                 '" AND netbeauty = "' + netbeauty +
    //                 '" AND vendor = "' + vendor +
    //                 '" AND restaurant = "' + restaurant +
    //                 '" AND alcohol = "' + alcohol +
    //                 '" AND favorite = "n"';

                
  var sql_func = 'SELECT * FROM FoodInfo WHERE sweet = "n' +
  '" AND salty = "y' +
  '" AND cheap = "y' +
  '" AND expensive = "n' +
  '" AND buffet = "n' +
  '" AND chinese = "y' +
  '" AND western = "n' +
  '" AND japanKorean = "n' +
  '" AND southeastAsian = "n' +
  '" AND netbeauty = "n' +
  '" AND vendor = "n' +
  '" AND restaurant = "y' +
  '" AND alcohol = "n' +
  '" AND favorite = "n"';

>>>>>>> master

    var sql_text = "SELECT * FROM FoodInfo";// WHERE Aname = '義大遊樂世界聖托里尼山城'
    
    this.sqliteDB.getRestaurantsbycondition(sql_func).then(res => {
      this.alldata = res
    })
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
  // this.service.collect(aname)
    this.presentLoading();
    for (let i = 0; i < this.alldata.length; i++) {
     if (this.alldata[i] === item) {
       this.alldata.splice(i, 1);
    }
   }console.log(this.favfood);
  }
}
