import { Component, OnInit,ViewChild} from '@angular/core';
import { ControllerserviceService, FavFoods, googleInfor } from '../../controllerservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { DbService } from '../../services/db.service';

declare var google;

@Component({
  selector: 'app-outcome-food',
  templateUrl: './outcome-food.page.html',
  styleUrls: ['./outcome-food.page.scss'],
})
export class OutcomeFoodPage implements OnInit {
  data: any;
  lock = 1; // update的鎖
  map;
  favfoods: FavFoods[]; // load進所有現存資料
  apiKey = 'AIzaSyCMjg0lGC43K_RsV687kghZ5qTAbPnQAMo';
  testbug = 1;
  alldata: any[] = [];
  testdata: any[] = [];
  distance: any;
  datanum = 0;
  exampleLat =  22.672179200000002;
  exampleLng =  120.28477439999999;
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
  @ViewChild('mapElement',{static:true}) mapElement;
  geocoder = new google.maps.Geocoder;

  ngOnInit(): void{
    
    this.service.getFavFoods().subscribe(res => {
      this.favfoods = res; //接受firebase裡所有的欄位
    });
    this.favfood.place =this.example; //將地址存進等等要放進firebase的地址裡 
    // this.service.addFavorite(this.favorite).then(() => { 每次存都會需要先新增欄位，用此處來新增欄位
    // }); 
    let sweet = this.data.sweet;
    let salty = this.data.salty;
    let cheap = this.data.cheap;
    let expensive = this.data.expensive;
    let buffet = this.data.buffet;
    let chinese = this.data.chinese;
    let western = this.data.western;
    let japanKorean = this.data.japanKorean;
    let southeastAsian = this.data.southeastAsian;
    let netbeauty = this.data.netbeauty;
    let vendor = this.data.vendor;
    let restaurant = this.data.restaurant;
    let alcohol = this.data.alcohol;
    this.exampleLat = Number(this.data.lat);
    this.exampleLng = Number(this.data.long);
    if(sweet=="y"){  //有條件的加入sql式中
      sweet = ' sweet = "'+ sweet + '"'; 
    }else{ 
      sweet = "";
    }
    if(salty=="y"){  //有條件的加入sql式中
      salty = ' And salty = "'+ salty + '"'; 
    }else{ 
      salty = "";
    }
    if(cheap=="y"){  //有條件的加入sql式中
      cheap = ' And cheap = "'+ cheap + '"'; 
    }else{
      cheap = "";
    }
    if(expensive=="y"){  //有條件的加入sql式中
      expensive = ' And expensive = "'+ expensive + '"'; 
    }else{
      expensive = "";
    }
    if(buffet=="y"){  //有條件的加入sql式中
      buffet = ' And buffet = "'+ buffet + '"'; 
    }else{
      buffet = "";
    }
    if(chinese=="y"){  //有條件的加入sql式中
      chinese = ' And chinese = "'+ chinese + '"'; 
    }else{
      chinese = "";
    }
    if(western=="y"){  //有條件的加入sql式中
      western = ' And western = "'+ western + '"'; 
    }else{
      western = "";
    }
    if(japanKorean=="y"){  //有條件的加入sql式中
      japanKorean = ' And japanKorean = "'+ japanKorean + '"'; 
    }else{
      japanKorean = "";
    }
    if(southeastAsian=="y"){  //有條件的加入sql式中
      southeastAsian = ' And southeastAsian = "'+ southeastAsian + '"'; 
    }else{
      southeastAsian = "";
    }
    if(netbeauty=="y"){  //有條件的加入sql式中
      netbeauty = ' And netbeauty = "'+ netbeauty + '"'; 
    }else{
      netbeauty = "";
    }
    if(vendor=="y"){  //有條件的加入sql式中
      vendor = ' And vendor = "'+ vendor + '"'; 
    }else{
      vendor = "";
    }
    if(restaurant=="y"){  //有條件的加入sql式中
      restaurant = ' And restaurant = "'+ restaurant + '"'; 
    }else{
      restaurant = "";
    }
    if(alcohol=="y"){  //有條件的加入sql式中
      alcohol = ' And alcohol = "'+ alcohol + '"'; 
    }else{
      alcohol = "";
    }

  var sql_func = 'SELECT * FROM FoodInfo WHERE' 
  + sweet + salty + cheap + expensive + buffet + chinese
  + western + japanKorean + southeastAsian + netbeauty
  + vendor + restaurant + alcohol + ' AND favorite = "n"';
  // '" AND cheap = "y' +
  // '" AND expensive = "n' +
  // '" AND buffet = "n' +
  // '" AND chinese = "y' +
  // '" AND western = "n' +
  // '" AND japanKorean = "n' +
  // '" AND southeastAsian = "n' +
  // '" AND netbeauty = "n' +
  // '" AND vendor = "n' +
  // '" AND restaurant = "y' +
  // '" AND alcohol = "n' +
  // '" AND favorite = "n"';
  console.log(sql_func);

    var sql_text = "SELECT * FROM FoodInfo";// WHERE Aname = '義大遊樂世界聖托里尼山城'
    
    this.sqliteDB.getRestaurantsbycondition(sql_func,this.datanum).then(res => {
      this.alldata = res;
      console.log(this.exampleLat); 
      this.presentLoading(); 
      // for(let i = 0;i<10;i++){
      //   this.testData[i]= this.alldata[i];
      //   this.geocoder.geocode({'address': this.alldata[i].Address },  (results, status)  => { //先找到當地的經緯度 
      //         let pos;
      //         if (status == google.maps.GeocoderStatus.OK) {
      //             pos = {                                         //目標經緯度
      //               lat: results[0].geometry.location.lat(),
      //               lng: results[0].geometry.location.lng()
      //             };    
      //             console.log(pos);
      //             // let watch = this.geolocation.watchPosition();
      //             // watch.subscribe((data) => {
      //             //  // 兩者合併算距離
      //             //  console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(data.coords.latitude,data.coords.longitude)));
      //             if(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng))>=1000){
      //                console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng)))
      //                this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng))/1000;
      //                this.distance = Math.round(this.distance);
      //                console.log(this.distance);
      //                if(this.distance>this.data.distance){
      //                   console.log("太遠了"); 
      //                   this.alldata.splice(this.alldata.indexOf(this.alldata[i]),1);
      //                } 
      //                this.distance = this.distance +"公里";
      //                this.alldata[i].distance = this.distance; 
                     
      //              }else{ 
      //               console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng)))
      //               this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng));
      //               this.distance = Math.round(this.distance);
      //               console.log(this.distance);
      //               if(this.distance/1000>this.data.distance){
      //                 console.log(this.distance/1000);
      //                 console.log("太遠了");
      //                 this.alldata.splice(this.alldata.indexOf(this.alldata[i]),1);
      //               } 
      //               this.distance = this.distance +"公尺";
      //               this.alldata[i].distance = this.distance;
      //               }
      //              // 四捨五入
      //             // });                 
      //         }  
      //         else{
      //           console.log("失敗了")
      //         }     
      //       });
          
      
      this.alldata.forEach(element => {
        this.geocoder.geocode({'address': element.Address },  (results, status)  => { //先找到當地的經緯度 
          let pos;
          if (status == google.maps.GeocoderStatus.OK) {
              pos = {                                         //目標經緯度
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
              };    
              console.log(pos);
              // let watch = this.geolocation.watchPosition();
              // watch.subscribe((data) => {
              //  // 兩者合併算距離
              //  console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(data.coords.latitude,data.coords.longitude)));
              if(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng))>=1000){
                 console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng)))
                 this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng))/1000;
                 this.distance = Math.round(this.distance);
                 console.log(this.distance);
                 if(this.distance>this.data.distance){
                    console.log("太遠了"); 
                    this.alldata.splice(this.alldata.indexOf(element),1);
                 } 
                 this.distance = this.distance +"公里";
                 element.distance = this.distance; 
                 
               }else{ 
                console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng)))
                this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng));
                this.distance = Math.round(this.distance);
                console.log(this.distance);
                if(this.distance/1000>this.data.distance){
                  console.log(this.distance/1000);
                  console.log("太遠了");
                  this.alldata.splice(this.alldata.indexOf(element),1);
                } 
                this.distance = this.distance +"公尺";
                element.distance = this.distance;
                }
               // 四捨五入
              // });                 
          }  
          else{
            console.log("失敗了")
          }     
        });
      })
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
  nextpage(){
    this.datanum = this.datanum + 10;
    console.log(this.datanum);
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

    this.sqliteDB.getRestaurantsbycondition(sql_func,this.datanum).then(res => {
      this.alldata = res;
      this.presentLoading();
      this.alldata.forEach(element => {
        this.geocoder.geocode({'address': element.Address },  (results, status)  => { //先找到當地的經緯度 
          let pos;
          if (status == google.maps.GeocoderStatus.OK) {
              pos = {                                         //目標經緯度
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
              };    
              console.log(pos);
              // let watch = this.geolocation.watchPosition();
              // watch.subscribe((data) => {
              //  // 兩者合併算距離
              //  console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(data.coords.latitude,data.coords.longitude)));
              if(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng))>=1000){
                console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng)))
                this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng))/1000;
                this.distance = Math.round(this.distance);
                console.log(this.distance);
                if(this.distance>this.data.distance){
                    console.log("太遠了"); 
                    this.alldata.splice(this.alldata.indexOf(element),1);
                } 
                this.distance = this.distance +"公里";
                element.distance = this.distance; 
                
              }else{ 
                console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng)))
                this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng));
                this.distance = Math.round(this.distance);
                console.log(this.distance);
                if(this.distance/1000>this.data.distance){
                  console.log(this.distance/1000);
                  console.log("太遠了");
                  this.alldata.splice(this.alldata.indexOf(element),1);
                } 
                this.distance = this.distance +"公尺";
                element.distance = this.distance;
                }
              // 四捨五入
              // });                 
          }  
          else{
            console.log("失敗了")
          }     
        });
      }) 
    })
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
