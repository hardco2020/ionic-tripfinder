import { Component, OnInit,ViewChild} from '@angular/core';
import { ControllerserviceService, FavFoods, googleInfor,FoodieData} from '../../controllerservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { DbService } from '../../services/db.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NavigationExtras } from '@angular/router';
import { IonBackButtonDelegate } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { IonInfiniteScroll } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
declare var google;

@Component({
  selector: 'app-outcome-food',
  templateUrl: './outcome-food.page.html',
  styleUrls: ['./outcome-food.page.scss'],
})
export class OutcomeFoodPage implements OnInit {
  data: any;
  scrolldata: any[] = [];
  lock = 1; // update的鎖
  map;
  count = 0; //用來做限制數量的迴圈
  wait : any;
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
    collection: 1,
    link: '123',
    tag:""
  };
  category: any[]  = []; //放標籤的欄位
  favfoods: FavFoods[]; // load進所有現存資料
  foodie : FoodieData = {
    Aname: "n",
    brunch: "n",
    expencive : "n",
    hotpot: "n",
    dessert: "n",
    snack: "n",
    date: "n",
    cake: "n",
    coffee: "n",
    bar: "n",
    steak: "n",
    barbeque: "n",
    japenesebar: "n",
    beverage:"n",
    banquet: "n",  
    latenight: "n",
    seafood: "n",   
    ramen:"n",
    beefnoodle: "n",
    sushi: "n",
    vegetarian:"n",
    japenese: "n",
    korean :"n",
    chinese : "n",
    american:"n",
    italian: "n",
    taifood : "n",
    honkong: "n",
    breakfast: "n",
    lunch: "n",
    dinner: "n",
    petfriendly: "n",
    distance : 0 ,
    favorite: "n",
    photo: "n",
    link: "n",
    tag : ""
  };
  selection: any;
  example ="BOSTON龍蝦餐廳"; //到時候會改成所有地點的資料
  foodies: FoodieData[];

  // Test data
  constructor(
    private storage: NativeStorage,
    public nav: NavController,
    public iab : InAppBrowser,
    private route: ActivatedRoute,
    private sqliteDB: DbService,
    public service: ControllerserviceService,
    private loadingController: LoadingController,
    public alertController: AlertController
    ) {
    this.route.queryParams.subscribe(param => {
      if (param && param.special) {
        this.data = JSON.parse(param.special);
        console.log(this.data);
        console.log(Object.keys(this.data)[3])
      }
    });
  }
  @ViewChild(IonInfiniteScroll,{ static: true }) infiniteScroll: IonInfiniteScroll; //infinte scroll
  @ViewChild(IonBackButtonDelegate, { static: false }) backButton: IonBackButtonDelegate;
  @ViewChild('mapElement',{static:true}) mapElement;
  geocoder = new google.maps.Geocoder;

  ngOnInit(): void{
    this.service.getFavFoods().subscribe(res => {
      this.favfoods = res; //接受firebase裡所有的欄位
    });
    this.service.changeFoodie(Object.keys(this.data)[3]).subscribe(res => {
      this.alldata = res;    
      //一開始先算六筆 顯示三筆 之後往下 顯示三筆 但會比顯示的在多計算三筆
      for (let i = this.count; i < this.count+6; i++) {
        console.log(this.alldata[i].Aname)
        console.log("目前數道"+i)
        this.geocoder.geocode({'address': this.alldata[i].address },  (results, status)  => { //先找到當地的經緯度 
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
                // console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng)))
                this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng))/1000;
                this.distance = Math.round(this.distance);
                // console.log(this.distance);
                if(this.distance>this.data.distance){
                    // console.log("太遠了"); 
                    // this.alldata.splice(this.alldata.indexOf(this.alldata[i]),1);
                } 
                
                this.distance = this.distance +"公里";
                console.log(this.alldata[i].Aname+this.distance)
                this.alldata[i].distance = this.distance; 
                
              }else{ 
                console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng)))
                this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.data.lat,this.exampleLng));
                this.distance = Math.round(this.distance);
                console.log(this.distance);
                if(this.distance/1000>this.data.distance){
                  console.log(this.distance/1000);
                  console.log("太遠了");
                  // this.alldata.splice(this.alldata.indexOf(this.alldata[i]),1);
                } 
                this.distance = this.distance +"公尺";
                this.alldata[i].distance = this.distance;
                }
              // 四捨五入
              // });                 
          }  
          else{
            console.log(status)
          }     
        });
        
      }
      for (let i = 0; i < 3; i++) { //只先顯示三筆 上面跑六筆
        this.scrolldata.push(this.alldata[i])
      }
      // // this.tourists= res; //接受firebase裡所有的欄位
      this.count = this.count+6
      console.log("目前記數器為"+this.count)
      this.presentLoading()
    });
    this.favfood.place =this.example; //將地址存進等等要放進firebase的地址裡 
    // this.service.addFavorite(this.favorite).then(() => { 每次存都會需要先新增欄位，用此處來新增欄位
    // }); 
    let brunch = this.data.brunch;
    let expencive = this.data.expencive;
    let hotpot = this.data.hotpot;
    let dessert = this.data.dessert;
    let snack = this.data.snack;
    let date = this.data.date;
    let cake = this.data.cake;
    let coffee = this.data.coffee;
    let bar = this.data.bar;
    let steak = this.data.steak;
    let barbeque = this.data.barbeque;
    let japenesebar = this.data.japenesebar;
    let beverage = this.data.beverage;
    let banquet = this.data.banquet;
    let latenight = this.data.latenight;
    let seafood = this.data.seafood;
    let ramen = this.data.ramen;
    let beefnoodle = this.data.beefnoodle;
    let sushi = this.data.sushi;
    let vegetarian = this.data.vegetarian;
    let japenese = this.data.japenese;
    let korean = this.data.korean;
    let chinese = this.data.chinese;
    let american = this.data.american;
    let italian = this.data.italian;
    let taifood = this.data.taifood;
    let honkong = this.data.honkong;
    let breakfast = this.data.breakfast;
    let lunch = this.data.lunch;
    let dinner = this.data.dinner;
    let petfriendly = this.data.petfriendly;
    // this.exampleLat = Number(this.data.lat);
    // this.exampleLng = Number(this.data.long);
    this.selection = {
      distance: this.data.distance,
      lat: this.data.lat,
      long: this.data.long 
    };
    if(brunch=="y"){  //有條件的加入sql式中
      this.category.push("早午餐");        
    }else{
      brunch = "";
    }
    if(expencive=="y"){  //有條件的加入sql式中
      this.category.push("精緻高級");        
    }else{
      expencive = "";
    }
    if(hotpot=="y"){  //有條件的加入sql式中
      this.category.push("火鍋");        
    }else{
      hotpot = "";
    }
    if(dessert=="y"){  //有條件的加入sql式中
      this.category.push("甜點");        
    }else{
      dessert = "";
    }
    if(snack=="y"){  //有條件的加入sql式中
      this.category.push("小吃");        
    }else{
      snack = "";
    }
    if(date=="y"){  //有條件的加入sql式中
      this.category.push("約會餐廳");        
    }else{
      date = "";
    }
    if(cake=="y"){  //有條件的加入sql式中
      this.category.push("蛋糕");        
    }else{
      cake = "";
    }
    if(coffee=="y"){  //有條件的加入sql式中
      this.category.push("咖啡");        
    }else{
      coffee = "";
    }
    if(bar=="y"){  //有條件的加入sql式中
      this.category.push("酒吧/餐酒館");        
    }else{
      bar = "";
    }
    if(steak=="y"){  //有條件的加入sql式中
      this.category.push("牛排");        
    }else{
      steak = "";
    }
    if(barbeque=="y"){  //有條件的加入sql式中
      this.category.push("燒烤");        
    }else{
      barbeque = "";
    }
    if(japenesebar=="y"){  //有條件的加入sql式中
      this.category.push("居酒屋");        
    }else{
      japenesebar = "";
    }
    if(beverage=="y"){  //有條件的加入sql式中
      this.category.push("冰品飲料");        
    }else{
      beverage = "";
    }
    if(banquet=="y"){  //有條件的加入sql式中
      this.category.push("合菜");        
    }else{
      banquet = "";
    }
    if(latenight=="y"){  //有條件的加入sql式中
      this.category.push("宵夜");        
    }else{
      latenight = "";
    }
    if(seafood=="y"){  //有條件的加入sql式中
      this.category.push("海鮮");        
    }else{
      seafood = "";
    }
    if(ramen=="y"){  //有條件的加入sql式中
      this.category.push("拉麵");        
    }else{
      ramen = "";
    }
    if(beefnoodle=="y"){  //有條件的加入sql式中
      this.category.push("牛肉麵");        
    }else{
      beefnoodle = "";
    }
    if(sushi=="y"){  //有條件的加入sql式中
      this.category.push("壽司");        
    }else{
      sushi = "";
    }
    if(vegetarian=="y"){  //有條件的加入sql式中
      this.category.push("素食");        
    }else{
      vegetarian = "";
    }
    if(japenese=="y"){  //有條件的加入sql式中
      this.category.push("日式料理");        
    }else{
      japenese = "";
    }
    if(korean=="y"){  //有條件的加入sql式中
      this.category.push("韓國料理");        
    }else{
      korean = "";
    }
    if(chinese=="y"){  //有條件的加入sql式中
      this.category.push("中式料理");        
    }else{
      chinese = "";
    }
    if(american=="y"){  //有條件的加入sql式中
      this.category.push("美式料理");        
    }else{
      american = "";
    }
    if(italian=="y"){  //有條件的加入sql式中
      this.category.push("義式料理");        
    }else{
      italian = "";
    }
    if(taifood=="y"){  //有條件的加入sql式中
      this.category.push("泰式料理");        
    }else{
      taifood = "";
    }
    if(honkong=="y"){  //有條件的加入sql式中
      this.category.push("港式料理");        
    }else{
      honkong = "";
    }
    if(breakfast=="y"){  //有條件的加入sql式中
      this.category.push("早餐");        
    }else{
      breakfast = "";
    }
    if(lunch=="y"){  //有條件的加入sql式中
      this.category.push("午餐");        
    }else{
      lunch = "";
    }
    if(dinner=="y"){  //有條件的加入sql式中
      this.category.push("晚餐");        
    }else{
      dinner = "";
    }

    if(petfriendly=="y"){  //有條件的加入sql式中
      this.category.push("森林步道");        
    }else{
      petfriendly = "";
    }
    
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
  // console.log(sql_func);

  //   var sql_text = "SELECT * FROM FoodInfo";// WHERE Aname = '義大遊樂世界聖托里尼山城'
    
  //   this.sqliteDB.getRestaurantsbycondition(sql_func,this.datanum).then(res => {
  //     this.alldata = res;
  //     console.log(this.exampleLat); 
  //     this.presentLoading(); 
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
          
      
  //     this.alldata.forEach(element => {
  //       this.geocoder.geocode({'address': element.Address },  (results, status)  => { //先找到當地的經緯度 
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
  //                   this.alldata.splice(this.alldata.indexOf(element),1);
  //                } 
  //                this.distance = this.distance +"公里";
  //                element.distance = this.distance; 
                 
  //              }else{ 
  //               console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng)))
  //               this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng));
  //               this.distance = Math.round(this.distance);
  //               console.log(this.distance);
  //               if(this.distance/1000>this.data.distance){
  //                 console.log(this.distance/1000);
  //                 console.log("太遠了");
  //                 this.alldata.splice(this.alldata.indexOf(element),1);
  //               } 
  //               this.distance = this.distance +"公尺";
  //               element.distance = this.distance;
  //               }
  //              // 四捨五入
  //             // });                 
  //         }  
  //         else{
  //           console.log("失敗了")
  //         }     
  //       });
  //     })
  //   })
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
  calculateDistance(){
    console.log("目前記數器為"+this.count)
    for (let i = this.count; i < this.count+3; i++) {
      console.log(this.alldata[i].Aname)
      console.log("目前數道"+i)
      this.geocoder.geocode({'address': this.alldata[i].address },  (results, status)  => { //先找到當地的經緯度 
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
              // console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng)))
              this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng))/1000;
              this.distance = Math.round(this.distance);
              // console.log(this.distance);
              if(this.distance>this.data.distance){
                  // console.log("太遠了"); 
                  // this.alldata.splice(this.alldata.indexOf(this.alldata[i]),1);
              } 
              
              this.distance = this.distance +"公里";
              console.log(this.alldata[i].Aname+this.distance)
              this.alldata[i].distance = this.distance; 
              
            }else{ 
              console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng)))
              this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.data.lat,this.exampleLng));
              this.distance = Math.round(this.distance);
              console.log(this.distance);
              if(this.distance/1000>this.data.distance){
                console.log(this.distance/1000);
                console.log("太遠了");
                // this.alldata.splice(this.alldata.indexOf(this.alldata[i]),1);
              } 
              this.distance = this.distance +"公尺";
              this.alldata[i].distance = this.distance;
              }
            // 四捨五入
            // });                 
        }  
        else{
          console.log(status)
        }     
      });
      this.scrolldata.push(this.alldata[i-3])
    }
    // // this.tourists= res; //接受firebase裡所有的欄位
    this.count = this.count+3
  }
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.calculateDistance();
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
    }, 500);
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '系統',
      // subHeader: 'Subtitle',
      message: '此餐廳已經在你的收藏裡了喔!',
      buttons: ['確認']
    });

    await alert.present();
  }

  UpdateCollection(aname,photo,item) {   
    this.lock = 0;
    this.favfood.place= aname;
    console.log(this.favfood.place)
    this.favfood.img = photo
    this.favfood.link = item.link
    this.favfood.tag = item.tag  
    this.storage.getItem('datas3').then((val) => { //放進本地端的儲存機制 先拿出原本的資料然後Push進去
      if(val.findIndex(x => x.place === this.favfood.place)>=1){
        this.presentAlert() //顯示彈跳視窗
        console.log("重複了")
      }else{ 
        console.log("沒重複")
        val.push(this.favfood) 
        this.storage.setItem('datas3',val);
        this.presentLoading();
      }
    });  
    this.alldata.forEach(element => { //更新favorite欄位
      if(element.Aname==this.favfood.place){ //如果重複位置則UPDATE  
        this.foodie = element
        this.foodie.favorite = "y"
        // this.service.updateFoodie(this.foodie,element.id).then(() => {
        // }); 應該要用local的欄位去控制資料 如果用線上的 就會變成一個人改 全部人都改了
      }else{  //如果位置沒重複則update (只會發生一次?) 當有兩個地點的時候
        // this.service.addFavorite(this.favorite).then(() => {
        // });
      }
    });
    this.favfoods.forEach(element => {
      if(element.place==this.favfood.place){ //如果重複位置則UPDATE  
        this.lock = 1;
        this.favfood.collection = element.collection + 1 ; //新增一個收藏的人
        this.service.updateFavFoods(this.favfood,element.id).then(() => {
        });
      }else{  //如果位置沒重複則update (只會發生一次?) 當有兩個地點的時候
        // this.service.addFavorite(this.favorite).then(() => {
        // });
      }
    });
    if(this.lock==0){
       this.favfood.collection = 1;
       this.service.addFavFoods(this.favfood).then(() => {
       });
    }
     //呼叫service的function  利用aname找資料庫

    // this.sqliteDB.updateAttraction(aname).then(() => {
    // });
    
    //this.service.collect(aname)
    // for(let i = 0; i < this.alldata.length; i++) {

    //   if(this.alldata[i] == item){
    //     this.alldata.splice(i, 1);
    //   }

    // }  
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.backButton.onClick = () => {
      // handle custom action here
      let navigationExtras: NavigationExtras = {
        queryParams: {
          special: JSON.stringify(this.selection)
        }
      };
      this.nav.navigateRoot(['tabs/tab1/selecting-food1'], navigationExtras);
    };
  }

  lastpage(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.selection)
      }
    };
    this.nav.navigateRoot(['tabs/tab1/selecting-food1'], navigationExtras);
  }
  onshow(url){ //連接到blog資訊
    const browser = this.iab.create(url);
  }
  changecategory(value){
    this.scrolldata = [];
    this.count = 0;
    if(value=="早午餐"){
      this.service.changeFoodie("brunch").subscribe(res => {
        this.alldata = res;
        for (let i = this.count; i < this.count+6; i++) {
          console.log(this.alldata[i].Aname)
          console.log("目前數道"+i)
          this.geocoder.geocode({'address': this.alldata[i].address },  (results, status)  => { //先找到當地的經緯度 
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
                  // console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng)))
                  this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng))/1000;
                  this.distance = Math.round(this.distance);
                  // console.log(this.distance);
                  if(this.distance>this.data.distance){
                      // console.log("太遠了"); 
                      // this.alldata.splice(this.alldata.indexOf(this.alldata[i]),1);
                  } 
                  
                  this.distance = this.distance +"公里";
                  console.log(this.alldata[i].Aname+this.distance)
                  this.alldata[i].distance = this.distance; 
                  
                }else{ 
                  console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng)))
                  this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.data.lat,this.exampleLng));
                  this.distance = Math.round(this.distance);
                  console.log(this.distance);
                  if(this.distance/1000>this.data.distance){
                    console.log(this.distance/1000);
                    console.log("太遠了");
                    // this.alldata.splice(this.alldata.indexOf(this.alldata[i]),1);
                  } 
                  this.distance = this.distance +"公尺";
                  this.alldata[i].distance = this.distance;
                  }
                // 四捨五入
                // });                 
            }  
            else{
              console.log(status)
            }     
          });
          
        }
        for (let i = 0; i < 3; i++) { //只先顯示三筆 上面跑六筆
          this.scrolldata.push(this.alldata[i])
        }
        // // this.tourists= res; //接受firebase裡所有的欄位
        this.count = this.count+6
        console.log("目前記數器為"+this.count)
        this.presentLoading()
        // this.tourists= res; //接受firebase裡所有的欄位
        // console.log(this.alldata)
      });
      // this.alldata =this.service.changeTourist("themepark")
    }
    if(value=="精緻高級"){
      this.service.changeFoodie("expencive").subscribe(res => {
        this.alldata = res;  
        for (let i = this.count; i < this.count+6; i++) {
          console.log(this.alldata[i].Aname)
          console.log("目前數道"+i)
          this.geocoder.geocode({'address': this.alldata[i].address },  (results, status)  => { //先找到當地的經緯度 
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
                  // console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng)))
                  this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng))/1000;
                  this.distance = Math.round(this.distance);
                  // console.log(this.distance);
                  if(this.distance>this.data.distance){
                      // console.log("太遠了"); 
                      // this.alldata.splice(this.alldata.indexOf(this.alldata[i]),1);
                  } 
                  
                  this.distance = this.distance +"公里";
                  console.log(this.alldata[i].Aname+this.distance)
                  this.alldata[i].distance = this.distance; 
                  
                }else{ 
                  console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng)))
                  this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.data.lat,this.exampleLng));
                  this.distance = Math.round(this.distance);
                  console.log(this.distance);
                  if(this.distance/1000>this.data.distance){
                    console.log(this.distance/1000);
                    console.log("太遠了");
                    // this.alldata.splice(this.alldata.indexOf(this.alldata[i]),1);
                  } 
                  this.distance = this.distance +"公尺";
                  this.alldata[i].distance = this.distance;
                  }
                // 四捨五入
                // });                 
            }  
            else{
              console.log(status)
            }     
          });
          
        }
        for (let i = 0; i < 3; i++) { //只先顯示三筆 上面跑六筆
          this.scrolldata.push(this.alldata[i])
        }
        // // this.tourists= res; //接受firebase裡所有的欄位
        this.count = this.count+6
        console.log("目前記數器為"+this.count)
        this.presentLoading() 
        // console.log(this.alldata)
      });
    }
    if(value=="火鍋"){
      this.service.changeFoodie("hotpot").subscribe(res => {
        this.alldata = res;
        for (let i = this.count; i < this.count+6; i++) {
          console.log(this.alldata[i].Aname)
          console.log("目前數道"+i)
          this.geocoder.geocode({'address': this.alldata[i].address },  (results, status)  => { //先找到當地的經緯度 
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
                  // console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng)))
                  this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng))/1000;
                  this.distance = Math.round(this.distance);
                  // console.log(this.distance);
                  if(this.distance>this.data.distance){
                      // console.log("太遠了"); 
                      // this.alldata.splice(this.alldata.indexOf(this.alldata[i]),1);
                  } 
                  
                  this.distance = this.distance +"公里";
                  console.log(this.alldata[i].Aname+this.distance)
                  this.alldata[i].distance = this.distance; 
                  
                }else{ 
                  console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng)))
                  this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.data.lat,this.exampleLng));
                  this.distance = Math.round(this.distance);
                  console.log(this.distance);
                  if(this.distance/1000>this.data.distance){
                    console.log(this.distance/1000);
                    console.log("太遠了");
                    // this.alldata.splice(this.alldata.indexOf(this.alldata[i]),1);
                  } 
                  this.distance = this.distance +"公尺";
                  this.alldata[i].distance = this.distance;
                  }
                // 四捨五入
                // });                 
            }  
            else{
              console.log(status)
            }     
          });
          
        }
        for (let i = 0; i < 3; i++) { //只先顯示三筆 上面跑六筆
          this.scrolldata.push(this.alldata[i])
        }
        // // this.tourists= res; //接受firebase裡所有的欄位
        this.count = this.count+6
        console.log("目前記數器為"+this.count)
        this.presentLoading()       
        // console.log(this.alldata)
      });
    }
    if(value=="甜點"){
      this.service.changeFoodie("dessert").subscribe(res => {
        this.alldata = res;   
        for (let i = this.count; i < this.count+6; i++) {
          console.log(this.alldata[i].Aname)
          console.log("目前數道"+i)
          this.geocoder.geocode({'address': this.alldata[i].address },  (results, status)  => { //先找到當地的經緯度 
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
                  // console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng)))
                  this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng))/1000;
                  this.distance = Math.round(this.distance);
                  // console.log(this.distance);
                  if(this.distance>this.data.distance){
                      // console.log("太遠了"); 
                      // this.alldata.splice(this.alldata.indexOf(this.alldata[i]),1);
                  } 
                  
                  this.distance = this.distance +"公里";
                  console.log(this.alldata[i].Aname+this.distance)
                  this.alldata[i].distance = this.distance; 
                  
                }else{ 
                  console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng)))
                  this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.data.lat,this.exampleLng));
                  this.distance = Math.round(this.distance);
                  console.log(this.distance);
                  if(this.distance/1000>this.data.distance){
                    console.log(this.distance/1000);
                    console.log("太遠了");
                    // this.alldata.splice(this.alldata.indexOf(this.alldata[i]),1);
                  } 
                  this.distance = this.distance +"公尺";
                  this.alldata[i].distance = this.distance;
                  }
                // 四捨五入
                // });                 
            }  
            else{
              console.log(status)
            }     
          });
          
        }
        for (let i = 0; i < 3; i++) { //只先顯示三筆 上面跑六筆
          this.scrolldata.push(this.alldata[i])
        }
        // // this.tourists= res; //接受firebase裡所有的欄位
        this.count = this.count+6
        console.log("目前記數器為"+this.count)
        this.presentLoading()    
        // console.log(this.alldata)
      });
    }
    if(value=="小吃"){
      this.service.changeFoodie("snack").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="約會餐廳"){
      this.service.changeFoodie("date").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="蛋糕"){
      this.service.changeFoodie("cake").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="咖啡"){
      this.service.changeFoodie("coffee").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="酒吧/餐酒館"){
      this.service.changeFoodie("bar").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="牛排"){
      this.service.changeFoodie("steak").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="烤肉"){
      this.service.changeFoodie("barbeque").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="居酒屋"){
      this.service.changeFoodie("japenesebar").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      }); 
    }
    if(value=="冰品飲料"){
      this.service.changeFoodie("beverage").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="合菜"){
      this.service.changeFoodie("banquet").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="宵夜"){
      this.service.changeFoodie("latenight").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="海鮮"){
      this.service.changeFoodie("seafood").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="拉麵"){
      this.service.changeFoodie("ramen").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="牛肉麵"){
      this.service.changeFoodie("beefnoodle").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="壽司"){
      this.service.changeFoodie("sushi").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="素食"){
      this.service.changeFoodie("vegetarian").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="日式料理"){
      this.service.changeFoodie("japenese").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="韓式料理"){
      this.service.changeFoodie("korean").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="中式料理"){
      this.service.changeFoodie("chinese").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="美式料理"){
      this.service.changeFoodie("nationalscenic").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="義式料理"){
      this.service.changeFoodie("italian").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="泰式料理"){
      this.service.changeFoodie("taifood").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="港式料理"){
      this.service.changeFoodie("honkong").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="早餐"){
      this.service.changeFoodie("breakfast").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="中餐"){
      this.service.changeFoodie("lunch").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="晚餐"){
      this.service.changeFoodie("dinner").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="寵物友善"){
      this.service.changeFoodie("petfriendly").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    //測試
  }
}
