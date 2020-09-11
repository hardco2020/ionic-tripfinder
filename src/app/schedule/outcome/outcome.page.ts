import { Component, OnInit ,NgZone ,ViewChild, AfterContentInit} from '@angular/core';
import { ControllerserviceService,Favorites,googleInfor } from '../../controllerservice.service'
import { ActivatedRoute,Router } from '@angular/router';
//import { ConsoleReporter } from 'jasmine';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { NavController, LoadingController } from '@ionic/angular';
import { DbService } from '../../services/db.service'; 
import { analytics } from 'firebase';

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
   
   favorites: Favorites[]; //load進所有現存資料
   data: any;
   map;
   api_key = 'AIzaSyCMjg0lGC43K_RsV687kghZ5qTAbPnQAMo';
  //  distance: any;
  //  openingorNot : any;
  //  openPeriod : any;
  //  phoneNumber : any;
   example ="高雄小巨蛋"; //到時候會改成所有地點的資料
   distance : any;
   datanum = 0 ; //用來傳遞一次傳資料的數量
   alldata: any[] = [];//sqliteDB DBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDB 此行改到controllerservice後註解掉
  
   sql : any;
   alldata_old = [{      //所有的data
    "Aid": 1,
    "Aname": "大立百貨空中遊樂園",
    "photo": "CmRaAAAAIClT_Ynie6i7diws5vPTvz4IK7-cyWX93fkUtbAnI2EkIORzchzhzZARIHaaF6vDQTx78ZEIEjNX55fzXE2v8aSZ2PArtcX8rP2a7JeimjeaerACyg9ftF37z6p0cBnwEhDEW3u4n-x7AeGI2F5ApFAsGhSFoyAOGS2JKfDqLSLgRjabwJKxyQ",
    "GoogleClass": "amusement_park",
    "Phone": "07 261 3060",
    "Address": "801台灣高雄市前金區五福三路59號RF",
    "Rate": 4.2,
    "InorOut": "out",
    "StaticorDynamic": "d",
    "Netbeauty": "y",
    "Hipster": "n",
    "NearMountain": "n",
    "NearSea": "n",
    "Shopping": "y",
    "Exhibition": "n",
    "History": "n",
    "NightView": "y",
    "favorite": "n"
    
    },
    {
    "Aid": 2,
    "Aname": "澄清湖風景區 兒童樂園",
    "photo": "CmRaAAAAQNI4jsV8_g86CEU7tWjZQHtUOMN0mu3aL1sKekjMvWyGqCmyiz9miFN1v5WT6yoRh1KOIb_jmVK38p_Vfy60tcx8TI_hMJr9RQNSq-VtahYFp9OvIOGt5CGSssc_fyD0EhBpe0PveufVdBpENptCQqkqGhRd9VvD2vhgAxF_37fgh5eUlYENtw",
    "GoogleClass": "amusement_park",
    "Phone": "07 370 0821",
    "Address": "833台灣高雄市鳥松區",
    "Rate": 4,
    "InorOut": "out",
    "StaticorDynamic": "d",
    "Netbeauty": "y",
    "Hipster": "n",
    "NearMountain": "n",
    "NearSea": "n",
    "Shopping": "y",
    "Exhibition": "n",
    "History": "n",
    "NightView": "y",
    "favorite": "n"
    },
    {
      "Aid": 3,
      "Aname": "鈴鹿賽道樂園",
      "photo": "CmRaAAAAG8PNms_SXLnkhz00HQX-67phd-iMq8tNWMXrV8Gsv_l_oaBzi04AqrZsN4cbbHiz3NynrvZU0hd0LnuJpFtj3YuH3Rtd9Z6bhN-3kiS63zMjLoPgunF8SNbpUDtjyqlMEhAyqYYRWyTYj5kKDW05xWOpGhTTJNhM9B8xsRScOXNXZI-rdnyaOA",
      "GoogleClass": "amusement_park",
      "Phone": "07 796 7766",
      "Address": "806台灣高雄市前鎮區中安路1-1號",
      "Rate": 4.3,
      "InorOut": "out",
      "StaticorDynamic": "d",
      "Netbeauty": "y",
      "Hipster": "n",
      "NearMountain": "n",
      "NearSea": "n",
      "Shopping": "y",
      "Exhibition": "n",
      "History": "n",
      "NightView": "y",
      "favorite": "n"
    },
    {
      "Aid": 4,
      "Aname": "快樂100",
      "photo": "CmRZAAAA-fsbesBp772W6uhAJv9KHpHRzCJS2Zyc0DpWceXW0Wi_dUc7EwK7Ozcx7FzaE90wuNKoyMTrXW6a8c_Yx7kBs5oDKnG0vH0siWwKbxO45FBJKYQZcUHizAyKf_xIKR7dEhDMFLF-WuXuex-cB6-YAe2iGhTT7dyrqvN_b1Y0c7ujEV4GV4O4_Q",
      "GoogleClass": "amusement_park",
      "Phone": "07 970 3366",
      "Address": "806台灣高雄市前鎮區中華五路789號",
      "Rate": 3.8,
      "InorOut": "out",
      "StaticorDynamic": "d",
      "Netbeauty": "y",
      "Hipster": "n",
      "NearMountain": "n",
      "NearSea": "n",
      "Shopping": "y",
      "Exhibition": "n",
      "History": "n",
      "NightView": "y",
      "favorite": "n"
    }
    ]
   examples = ["鍋呆子鍋燒麵","老紀牛肉麵","高雄市立圖書館左新分館"];
   lock = 1; //update的鎖
   exampleLat =  22.672179200000002;
   exampleLng =  120.28477439999999;
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

    const Indoor = this.data.indoor;
    const Outdoor = this.data.outdoor;
    const Static = this.data.static;
    const Dynamic = this.data.dynamic;
    let  Netbeauty = this.data.netbeauty;
    let  Hipster = this.data.hipster;
    let NearSea = this.data.near_sea;
    let NearMountain = this.data.near_mountain;
    let NightView = this.data.night_view;
    let Shopping = this.data.shopping;
    let History = this.data.historic_site;
    var sql_where : String ;
    if(Netbeauty=="y"){  //有條件的加入sql式中
      Netbeauty = ' And Netbeauty = "'+ Netbeauty + '"'; 
    }else{
      Netbeauty = "";
    }
    if(Hipster=="y"){  //有條件的加入sql式中
      Hipster = ' And Hipster = "'+ Hipster + '"';
                 
    }else{
      Hipster = "";
    }
    if(NearSea=="y"){  //有條件的加入sql式中
      NearSea = ' And NearSea = "'+ NearSea + '"';
    }else{
      NearSea = "";
    }
    if(NearMountain=="y"){  //有條件的加入sql式中
      NearMountain = ' And NearMountain = "'+ NearMountain + '"';
    }else{
      NearMountain = "";
    }
    if(NightView=="y"){  //有條件的加入sql式中
      NightView = ' And NightView = "'+ NightView + '"';
    }else{
      NightView = "";
    }
    if(Shopping=="y"){  //有條件的加入sql式中
      Shopping = ' And Shopping = "'+ Shopping + '"';
    }else{
      Shopping = "";
    }
    if(History=="y"){  //有條件的加入sql式中
      History = ' And History = "'+ History + '"';
    }else{
      History = "";
    }
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
          sql_where = 'StaticorDynamic = "'+ StaticorDynamic + '"';
        }else if(Dynamic =="n" && Static =="y"){
          var StaticorDynamic = "s";
          sql_where = 'StaticorDynamic = "'+ StaticorDynamic + '"';
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
          sql_where = 'InorOut = "'+ InorOut + '"';
        }else if(Dynamic =="y" && Static =="n"){
          var StaticorDynamic = "d";
          sql_where = 'StaticorDynamic = "'+ StaticorDynamic + '" AND InorOut = "'+ InorOut + '"';
        }else if(Dynamic =="n" && Static =="y"){
          var StaticorDynamic = "s";
          sql_where = 'StaticorDynamic = "'+ StaticorDynamic + '" AND InorOut = "'+ InorOut + '"';
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
        sql_where = 'InorOut = "'+ InorOut + '"';
      }else if(Dynamic =="y" && Static =="n"){
        var StaticorDynamic = "d";
        sql_where = 'StaticorDynamic = "'+ StaticorDynamic + '" AND InorOut = "'+ InorOut + '"';
      }else if(Dynamic =="n" && Static =="y"){
        var StaticorDynamic = "s";
        sql_where = 'StaticorDynamic = "'+ StaticorDynamic + '" AND InorOut = "'+ InorOut + '"';
      }
    }
     
    // SQL 式 SQL 式 SQL 式 SQL 式 SQL 式 SQL 式x
    var sql_func = "SELECT * FROM AttractionInfo WHERE " + sql_where
                    +Netbeauty+Hipster+NearSea+NearMountain+NightView+Shopping+History+
                    ' AND favorite = "n"';
  
                    // '" AND Hipster = "' + Hipster +
                    // '" AND NearSea = "' + NearSea +
                    // '" AND NearMountain = "' + NearMountain +
                    // '" AND NightView = "' + NightView +
                    // '" AND Shopping = "' + Shopping +
                    // '" AND History = "' + History+
                    // '" AND favorite = "n"';
    this.sql = sql_func;
    console.log(sql_func); 
    //sqliteDB DBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDB 以上改到controllerservice後註解掉
    
    var sql_text = "SELECT * FROM AttractionInfo WHERE Aname = '義大遊樂世界聖托里尼山城'";
    
    this.sqliteDB.getAttractionsbycondition(sql_func,this.datanum).then(res => {
      this.alldata = res
      console.log(this.alldata);
      this.presentLoading();
      this.alldata.forEach(element => {
        this.geocoder.geocode({ 'address': element.Address },  (results, status)  => { //先找到當地的經緯度 
          let pos;
          if (status == google.maps.GeocoderStatus.OK) {
              pos = {                                         //目標經緯度
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
              };    
              // let watch = this.geolocation.watchPosition();
              // watch.subscribe((data) => {
              //  // 兩者合併算距離
              //  console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(data.coords.latitude,data.coords.longitude)));
              if(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng))>=1000){
    
                 this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng))/1000;
                 this.distance = Math.round(this.distance);
                 if(this.distance>this.data.distance){
                    console.log("太遠了");
                    this.alldata.splice(this.alldata.indexOf(element),1);
                 } 
                 this.distance = this.distance +"公里";
                 element.distance = this.distance;
                 
               }else{
                this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng));
                this.distance = Math.round(this.distance);
                if(this.distance/1000>this.data.distance){
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
            element.Aname = "失敗了";
          }   
        });
      });
    }) 
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
  }

  async presentLoading() { //等待Sign
    const loading = await this.loadingController.create({
      message: '添加中',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  nextpage(){   
    console.log(this.sql); 
    this.datanum = this.datanum+10;
    this.sqliteDB.getAttractionsbycondition(this.sql,this.datanum).then(res => {
      this.alldata = res
      console.log(this.alldata);
      this.presentLoading();
      this.alldata.forEach(element => {
        this.geocoder.geocode({ 'address': element.Address },  (results, status)  => { //先找到當地的經緯度 
          let pos;
          if (status == google.maps.GeocoderStatus.OK) {
              pos = {                                         //目標經緯度
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
              };    
              // let watch = this.geolocation.watchPosition();
              // watch.subscribe((data) => {
              //  // 兩者合併算距離
              //  console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(data.coords.latitude,data.coords.longitude)));
              if(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng))>=1000){
    
                 this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng))/1000;
                 this.distance = Math.round(this.distance);
                 if(this.distance>this.data.distance){
                    console.log("太遠了");
                    this.alldata.splice(this.alldata.indexOf(element),1);
                 } 
                 this.distance = this.distance +"公里";
                 element.distance = this.distance;
                 
               }else{
                this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng));
                this.distance = Math.round(this.distance);
                if(this.distance/1000>this.data.distance){
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
            element.Aname = "失敗了";
          }   
        });
      });
    }) 
  }
  UpdateCollection(aname,photo,item,aid) {   
    this.lock = 0;
    this.favorite.place= aname;
    this.favorite.img = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+photo+"&key="+this.api_key;
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

    this.sqliteDB.updateAttraction(aid).then(() => {
    });
    
    //this.service.collect(aname)
    this.presentLoading();
    for(let i = 0; i < this.alldata.length; i++) {

      if(this.alldata[i] == item){
        this.alldata.splice(i, 1);
      }

    }
    
     
    console.log(this.favorite);
    
  }
} 