import { Component, OnInit ,NgZone ,ViewChild, AfterContentInit} from '@angular/core';
import { ControllerserviceService,Favorites,googleInfor } from '../../controllerservice.service'
import { ActivatedRoute,Router } from '@angular/router';
//import { ConsoleReporter } from 'jasmine';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { NavController, LoadingController } from '@ionic/angular';
import { DbService } from '../../services/db.service'; 

declare var google;

@Component({
  selector: 'app-outcome',
  templateUrl: './outcome.page.html',
  styleUrls: ['./outcome.page.scss'],
})

export class OutcomePage implements OnInit {
   // 透過 url 將 selection 傳遞到此頁面
   favorite : Favorites = {
    img : "123",
    place: "測試",
    collection: 1 
   };
  //  test : googleInfor = {
  //   distance: 1,
  //   openingorNot:2,
  //   phoneNumber:3,
  //   openPeriod:4,
  //  };
  //  tests : googleInfor = {
  //   distance: 1,
  //   openingorNot:2,
  //   phoneNumber:3,
  //   openPeriod:4,
  //  };
  //  testss : googleInfor = {
  //   distance: 1,
  //   openingorNot:2,
  //   phoneNumber:3,
  //   openPeriod:4,
  //  };
  //  googles: googleInfor[] = [this.test,this.tests,this.testss];
   
   sql_text: String;
   favorites: Favorites[]; //load進所有現存資料
   data: any;
   map;
   api_key = 'AIzaSyCMjg0lGC43K_RsV687kghZ5qTAbPnQAMo';
  //  distance: any;
  //  openingorNot : any;
  //  openPeriod : any;
  //  phoneNumber : any;
   example ="高雄小巨蛋"; //到時候會改成所有地點的資料

   
   alldata: any[] = [];//sqliteDB DBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDB 此行改到controllerservice後註解掉
  

   alldata_old = [{      //所有的data
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
    },
    {
      "Aid": 4,
                        "Aname": "快樂100",
                        "photo": "CmRZAAAA-fsbesBp772W6uhAJv9KHpHRzCJS2Zyc0DpWceXW0Wi_dUc7EwK7Ozcx7FzaE90wuNKoyMTrXW6a8c_Yx7kBs5oDKnG0vH0siWwKbxO45FBJKYQZcUHizAyKf_xIKR7dEhDMFLF-WuXuex-cB6-YAe2iGhTT7dyrqvN_b1Y0c7ujEV4GV4O4_Q",
                        "GoogleClass": "amusement_park",
                        "Phone": "07 970 3366",
                        "Address": "806台灣高雄市前鎮區中華五路789號",
                        "Rate": 3.8
    }
    ]
   examples = ["鍋呆子鍋燒麵","老紀牛肉麵","高雄市立圖書館左新分館"];
   lock = 1; //update的鎖

   constructor(
     private route: ActivatedRoute, 
     private router: Router ,
     private zone: NgZone,
     private geolocation: Geolocation , 
     public service : ControllerserviceService, 
     private loadingController: LoadingController,
     private nav: NavController,
     private sqliteDB: DbService,
     )
    { 
     this.route.queryParams.subscribe(param=>{
       if(param && param.special){
         this.data = JSON.parse(param.special);
         console.log(this.data);
       }
     });
    }

   @ViewChild('mapElement',{static:true}) mapElement;
  geocoder = new google.maps.Geocoder;
  GoogleAutocomplete = new google.maps.places.AutocompleteService();

  ngOnInit(): void{
    this.service.getFavorites().subscribe(res => {
      this.favorites = res; //接受firebase裡所有的欄位
    });
    this.favorite.place =this.example; //將地址存進等等要放進firebase的地址裡 
    // this.service.addFavorite(this.favorite).then(() => { 每次存都會需要先新增欄位，用此處來新增欄位
    // }); 


    //sqliteDB DBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDB 以上改到controllerservice後註解掉
    this.sqliteDB.dbState().subscribe((res) => {
      if(res){
        this.sqliteDB.getAttractionsbycondition(this.sql_text)
      }
    });

    this.sqliteDB.dbState().subscribe((res) => {
      if(res){
        this.sqliteDB.fetchAttractionsbycondition().subscribe(item => { //連接API(db.services.ts)的fetchAttractions()取得資料
          this.alldata = item
        })
      }
    });
    //sqliteDB DBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDB 以下改到controllerservice後註解掉

  }
  ngAfterViewInit() : void{
    setTimeout(() => {
      console.log(this.mapElement.nativeElement.innerText);  //防止讀太快讀不到nativeElement
    }, 1000);
    this.map = new google.maps.Map(this.mapElement.nativeElement, 
      {
          center: { lat: -34.9011, lng: -56.1645 },
          zoom: 15
      });
    // 此處先用if else處理篩選
    // 等待竹秀將phase2傳值到此處
    /*
    資料庫
    |內外 | 動靜 |
      內     動
      外     靜

    ionic選項
    |室內 | 室外 | 動態 | 靜態 |
      勾    勾     勾     勾
     不勾   不勾   不勾   不勾
    （同時勾 = 同時不勾）

    */
   const Indoor = this.data.indoor;
   const Outdoor = this.data.outdoor;
   const Static = this.data.static;
   const Dynamic = this.data.dynamic;
   const Netbeauty = this.data.netbeauty;
   const Hipster = this.data.hipster;
   const NearSea = this.data.near_sea;
   const NearMountain = this.data.near_mountain;
   const NightView = this.data.night_view;
   const Shopping = this.data.shopping;
   const History = this.data.historic_site;

   this.sql_text = "SELECT * FROM AttractionInfo WHERE Indoor = 變數 AND Outdoor = 變數 AND Static = 變數 AND Dynamic = 變數 AND Netbeauty = 變數 AND Hipster = 變數 AND NearSea = 變數 AND NearMountain = 變數 AND NightView = 變數 AND Shopping = 變數 AND History = 變數 ";
   /*
    if 室內 = 室外:
        if 動態 = 靜態:
            SELECT * FROM ...
        elif 動態=勾 & 靜態=不勾:
            SELECT * FROM ...
            WHERE 動靜=動
        elif 動態=不勾 & 靜態=勾:
            SELECT *FROM ...
            WHERE 動靜=靜
    */
    if(Indoor == Outdoor){
      if(Dynamic == Static){
      }else if(Dynamic =="y" && Static =="n"){
        var StaticorDynamic = "d";
      }else if(Dynamic =="n" && Static =="y"){
        var StaticorDynamic = "s";
      }
    }

    /*
    elif 室內=勾 & 室外=不勾:
        if 動態 = 靜態:
            SELECT * FROM ...
            WHERE 內外=內
        elif 動態=勾 & 靜態=不勾:
            SELECT * FROM ...
            WHERE 內外=內 AND 動靜=動
        elif 動態=不勾 & 靜態=勾:
            SELECT * FROM ...
            WHERE 內外=內 AND 動靜=靜
    */
    else if (Indoor == 'y' && Outdoor == 'n'){
      var InorOut = 'in';
      if(Dynamic == Static){
      }else if(Dynamic =="y" && Static =="n"){
        var StaticorDynamic = "d";
      }else if(Dynamic =="n" && Static =="y"){
        var StaticorDynamic = "s";
      }
    }
    /*
    elif 室內=不勾 & 室外=勾:
        if 動態 = 靜態:
            SELECT * FROM ...
            WHERE 內外=外
        elif 動態=勾 & 靜態=不勾:
            SELECT * FROM ...
            WHERE 內外=外 AND 動靜=動
        elif 動態=不勾 & 靜態=勾:
            SELECT * FROM ...
            WHERE 內外=外 AND 動靜=靜
    */
  else if (Indoor == 'n' && Outdoor == 'y'){
    var InorOut = 'out';
    if(Dynamic == Static){
    }else if(Dynamic =="y" && Static =="n"){
      var StaticorDynamic = "d";
    }else if(Dynamic =="n" && Static =="y"){
      var StaticorDynamic = "s";
    }
  }


    
   
    //篩選出一系列地點後根據使用者的距離 金錢等等要求 做google place進一步二階段篩選
    // for(let i=0;i<=this.examples.length;i++){
    //   this.GoogleAutocomplete.getPlacePredictions({ input: this.examples[i] },  //用此地址作為範例
    //     (predictions, status) => {
    //       this.zone.run(() => {
    //         predictions.forEach((prediction) => {  
    //             let service = new google.maps.places.PlacesService(this.map);  //將算出的prediction id丟進detail來找到進階資訊
    //             service.getDetails(
    //               {placeId: prediction.place_id},
    //                 (results, status) =>{
    //                   console.log(results);
    //                   // console.log(results.opening_hours.open_now);  //知道現在有沒有開 
    //                   if(results.opening_hours.open_now==false){
    //                     this.googles[i].openingorNot= "休業中";
                  
    //                   }else{
    //                     this.googles[i].openingorNot = "營業中";
    //                   }
    //                   console.log(results.opening_hours.weekday_text);
    //                   console.log(i);
                      
    //                   this.googles[i].distance = i;
    //                   console.log(this.googles[i].distance);
    //                   this.googles[i].openPeriod = results.opening_hours.weekday_text;
    //                   this.googles[i].phoneNumber = results.formatted_phone_number;
                      
    //                 }
    //            );
    //       });
    //     });
    //   });
    //   this.geocoder.geocode({ 'address': this.examples[i]},  (results, status)  => { //先找到當地的經緯度 
    //     let pos;
    //       if (status == google.maps.GeocoderStatus.OK) {
    //           pos = {                                         //目標經緯度
    //             lat: results[0].geometry.location.lat(),
    //             lng: results[0].geometry.location.lng()
    //           };
    //           this.geolocation.getCurrentPosition().then((resp) => {  //自己的經緯度
    //             // resp.coords.latitude
    //             // resp.coords.longitude
    //            }).catch((error) => {
    //              console.log('Error getting location', error);
    //           });
    //           let watch = this.geolocation.watchPosition();
    //           watch.subscribe((data) => {
    //            // 兩者合併算距離
    //            //console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(data.coords.latitude,data.coords.longitude)));
    //            if(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(data.coords.latitude,data.coords.longitude))>=1000){
  
    //              this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(data.coords.latitude,data.coords.longitude))/1000;
                 
    //              this.distance = Math.round(this.distance);
    //              this.distance = this.distance +"公里";
    //              this.googles[i].distance = this.distance;
                 
    //            }else{
    //             this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(data.coords.latitude,data.coords.longitude));
    //             this.distance = Math.round(this.distance);
    //             this.distance = this.distance +"公尺";
    //             this.googles[i].distance = this.distance;
    //            }
    //            // 四捨五入
    //           });      
    //       }
    //   });  
    //   console.log(this.distance);
    // }
  
    ////////////////////測試
    // this.GoogleAutocomplete.getPlacePredictions({ input: this.example },  //用此地址作為範例
    //   (predictions, status) => {
    //     this.zone.run(() => {
    //       predictions.forEach((prediction) => {  
    //           //console.log(prediction)
    //           let service = new google.maps.places.PlacesService(this.map);  //將算出的prediction id丟進detail來找到進階資訊
    //           service.getDetails(
    //             {placeId: prediction.place_id},
    //               (results, status) =>{
    //                 //console.log(results);
    //                 //console.log(results.opening_hours.open_now);  //知道現在有沒有開 
    //                 if(results.opening_hours.open_now==false){
    //                   this.openingorNot = "休業中";
    //                 }else{
    //                   this.openingorNot = "營業中";
    //                 }
    //                 this.openPeriod = results.opening_hours.weekday_text;
    //                 this.phoneNumber = results.formatted_phone_number;
    //               }
    //          );
    //     });
    //   });
    // });
    ////////////找到兩地距離  1.先找到兩個地方的經緯度 再使用function計算出距離
    
  //   this.geocoder.geocode({ 'address': this.example},  (results, status)  => { //先找到當地的經緯度 
  //     let pos;
  //       if (status == google.maps.GeocoderStatus.OK) {
  //           pos = {                                         //目標經緯度
  //             lat: results[0].geometry.location.lat(),
  //             lng: results[0].geometry.location.lng()
  //           };
  //           this.geolocation.getCurrentPosition().then((resp) => {  //自己的經緯度
  //             // resp.coords.latitude
  //             // resp.coords.longitude
  //            }).catch((error) => {
  //              console.log('Error getting location', error);
  //           });
  //           let watch = this.geolocation.watchPosition();
  //           watch.subscribe((data) => {
  //            // 兩者合併算距離
  //            //console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(data.coords.latitude,data.coords.longitude)));
  //            if(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(data.coords.latitude,data.coords.longitude))>=1000){

  //              this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(data.coords.latitude,data.coords.longitude))/1000;
  //              this.distance = Math.round(this.distance);
  //              this.distance = this.distance +"公里";
  //            }else{
  //             this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(data.coords.latitude,data.coords.longitude));
  //             this.distance = Math.round(this.distance);
  //             this.distance = this.distance +"公尺";
  //            }
  //            // 四捨五入
  //           });      
  //       }
  //   });
  
  //   console.log(this.distance);
  // }
  }
  async presentLoading() { //等待Sign
    const loading = await this.loadingController.create({
      message: '添加中',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  UpdateCollection(aname,photo,item) {   
    this.lock = 0;
    this.favorite.place= aname;
    this.favorite.img = photo;
    this.favorites.forEach(element => {
      if(element.place==this.favorite.place){ //如果重複位置則UPDATE  
        this.lock = 1;
        this.favorite.collection = element.collection + 1 ; //新增一個收藏的人
        this.service.updateFavorite(this.favorite,element.id).then(() => {
        });
      }else{  //如果位置沒重複則update (只會發生一次?) 當有兩個地點的時候
        // this.service.addFavorite(this.favorite).then(() => {
        // });
      }
    });
     if(this.lock==0){
       this.favorite.collection = 1;
       this.service.addFavorite(this.favorite).then(() => {
       });
     }
     //呼叫service的function  利用aname找資料庫
    this.presentLoading();
    for(let i = 0; i < this.alldata.length; i++) {

      if(this.alldata[i] == item){
        this.alldata.splice(i, 1);
      }

    }
    
     
    console.log(this.favorite);
    
  }
}