import { Component, OnInit ,NgZone ,ViewChild, AfterContentInit} from '@angular/core';
import { ControllerserviceService,Favorites,TouristData,googleInfor } from '../../controllerservice.service'
import { ActivatedRoute,Router } from '@angular/router';
//import { ConsoleReporter } from 'jasmine';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { NavController, LoadingController,IonInfiniteScroll } from '@ionic/angular';
import { DbService } from '../../services/db.service'; 
import { analytics } from 'firebase';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonBackButtonDelegate } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertController } from '@ionic/angular';

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
    collection: 1,
    link:"",
    tag:""
   };
   favorites: Favorites[]; //load進所有現存資料
   //tourist的儲存欄位
   tourist : TouristData = {
    Aname: "測試data",
    hipster: "n",
    watersport : "n",
    themepark: "n",
    historic: "n",
    latern: "n",
    tourbus: "n", 
    mustbuy: "n",
    hotspot: "n", 
    creature: "n",
    seafood: "n", 
    weirdscene: "n",  
    temple: "n", 
    weddingdress: "n",  
    hotspring: "n",  
    dawn: "n",  
    musteat: "n",  
    exhibition: "n",
    seaview: "n",
    summer: "n",
    date: "n",
    seabay: "n",
    sunset :"n",
    nationalpark : "n",
    nationalscenic: "n",
    nationalforest: "n",
    oldstreet : "n",
    nightstreet: "n",
    tribetour: "n",
    museum: "n",
    biketour: "n",
    foresttrail: "n",
    barrierfree: "n",
    moutaintrail: "n",
    hakka: "n",
    kol: "n",
    nightview: "n",
    flowerview: "n",
    battlefield:"n",
    lighthouse: "n",
    familyfriendly: "n",
    art: "n",
    railway: "n",
    viewingplatform: "n",
    favorite: "n",
    photo: "n",
    link: "n",
    tag : ""
   };
   examplebutton = "文青必去,水上活動,古蹟巡遊" //測試用來顯示tag的欄位如果長這樣有沒有辦法分開
   exampletag: any[] = [];
   tourists: TouristData[];
   data: any;
   map;
   index = 0;
   api_key = 'AIzaSyCMjg0lGC43K_RsV687kghZ5qTAbPnQAMo';
  //  distance: any;
  //  openingorNot : any;
  //  openPeriod : any;
  //  phoneNumber : any;
   example ="高雄小巨蛋"; //到時候會改成所有地點的資料
   distance : any;
   datanum = 0 ; //用來傳遞一次傳資料的數量
   alldata: any[] = [];//sqliteDB DBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDB 此行改到controllerservice後註解掉
   alldata_new: any[] = []; //新的放入的data
   sql : any;
   examples = ["鍋呆子鍋燒麵","老紀牛肉麵","高雄市立圖書館左新分館"];
   lock = 1; //update的鎖
   exampleLat =  22.672179200000002;
   exampleLng =  120.28477439999999;
   category: any[]  = [];
   selection: any;
   constructor(
    private storage: NativeStorage,
     public iab : InAppBrowser,
     private route: ActivatedRoute, 
     private router: Router ,
     private zone: NgZone,
     private geolocation: Geolocation , 
     public service : ControllerserviceService, 
     private loadingController: LoadingController,
     private nav: NavController,
     private sqliteDB: DbService,
     public alertController: AlertController
     )
    { 
     this.route.queryParams.subscribe(param=>{
       if(param && param.special){
         this.data = JSON.parse(param.special);
         this.service.tag == Object.keys(this.data)[4]
         console.log(this.data);
       }
     });
    }
    @ViewChild(IonBackButtonDelegate, { static: false }) backButton: IonBackButtonDelegate;
  @ViewChild(IonInfiniteScroll,{static:true}) infiniteScroll: IonInfiniteScroll;
   @ViewChild('mapElement',{static:true}) mapElement;
  geocoder = new google.maps.Geocoder;
  GoogleAutocomplete = new google.maps.places.AutocompleteService();

  ngOnInit(): void{
    this.service.getFavorites().subscribe(res => {
      this.favorites = res; //接受firebase裡所有的欄位
    });
    this.service.changeTourist(Object.keys(this.data)[3]).subscribe(res => {
      console.log(this.data)
      console.log(Object.keys(this.data)[3])
      this.alldata = res;   
      // this.tourists= res; //接受firebase裡所有的欄位
      console.log(this.alldata)
    });
    this.favorite.place =this.example; //將地址存進等等要放進firebase的地址裡 
    // this.service.addFavorite(this.favorite).then(() => { 每次存都會需要先新增欄位，用此處來新增欄位
    // }); 

    let  Hipster = this.data.hipster;
    let  Watersport = this.data.watersport;
    let  Themepark = this.data.themepark;
    let  Historic = this.data.historic;
    let  Latern = this.data.latern;
    let  Tourbus = this.data.tourbus;
    let  Mustbuy = this.data.mustbuy;
    let  Hotspot = this.data.hotspot;
    let  Creature = this.data.creature;
    let  seafood = this.data.seafood;
    let  weirdscene = this.data.weirdscene;
    let  temple = this.data.temple;
    let  weddingdress = this.data.weddingdress;
    let  hotspring = this.data.hotspring;
    let  dawn = this.data.dawn;
    let  musteat = this.data.musteat;
    let  exhibtion = this.data.exhibition;
    let  seaview = this.data.seaview;
    let  summer = this.data.summer;
    let  date = this.data.date;
    let  seabay = this.data.seabay;
    let  sunset = this.data.sunset;
    let  nationalpark = this.data.nationalpark;
    let  nationalscenic = this.data.nationalscenic;
    let  nationalforest = this.data.nationalforest;
    let  oldstreet = this.data.oldstreet;
    let  nightstreet = this.data.nightstreet;
    let  tribetour = this.data.tribetour;
    let  museum = this.data.museum;
    let  biketour = this.data.biketour;
    let  foresttrail = this.data.foresttrail;
    let  barrierfree = this.data.barrierfree;
    let  moutaintrail = this.data.moutaintrail;
    let  hakka = this.data.hakka;
    let  kol = this.data.kol;
    let  nightview = this.data.nightview;
    let  flowerview = this.data.flowerview;
    let  battlefield = this.data.battlefield;
    let  lighthouse = this.data.lighthouse;
    let  familyfriendly = this.data.familyfriendly;
    let  art = this.data.art;
    let  railway = this.data.railway;
    let  viewingplatform = this.data.viewingplatform;
    this.selection = {
      distance: this.data.distance,
      lat: this.data.lat,
      long: this.data.long 
    };
    console.log(Hipster)
    if(Hipster=="y"){  //有條件的加入sql式中
      this.category.push("文青必去");        
    }else{
      Hipster = "";
    }
    if(Watersport=="y"){  //有條件的加入sql式中
      this.category.push("水上運動");        
    }else{
      Watersport = "";
    }
    if(Themepark=="y"){  //有條件的加入sql式中
      this.category.push("主題樂園");        
    }else{
      Themepark = "";
    }
    if(Historic=="y"){  //有條件的加入sql式中
      this.category.push("古蹟巡遊");        
    }else{
      Historic = "";
    }
    if(Latern=="y"){  //有條件的加入sql式中
      this.category.push("台灣燈會");        
    }else{
      Latern = "";
    }
    if(Tourbus=="y"){  //有條件的加入sql式中
      this.category.push("台灣觀巴");        
    }else{
      Tourbus = "";
    }
    if(Mustbuy=="y"){  //有條件的加入sql式中
      this.category.push("必買");        
    }else{
      Mustbuy = "";
    }
    if(Hotspot=="y"){  //有條件的加入sql式中
      this.category.push("打卡熱點");        
    }else{
      Hotspot = "";
    }
    if(Creature=="y"){  //有條件的加入sql式中
      this.category.push("生態體驗");        
    }else{
      Creature = "";
    }
    if(seafood=="y"){  //有條件的加入sql式中
      this.category.push("吃海鮮");        
    }else{
      seafood = "";
    }
    if(weirdscene=="y"){  //有條件的加入sql式中
      this.category.push("地質奇觀");        
    }else{
      weirdscene = "";
    }
    if(temple=="y"){  //有條件的加入sql式中
      this.category.push("寺廟祈福");        
    }else{
      temple = "";
    }
    if(weddingdress=="y"){  //有條件的加入sql式中
      this.category.push("婚紗拍攝");        
    }else{
      weddingdress = "";
    }
    if(hotspring=="y"){  //有條件的加入sql式中
      this.category.push("泡溫泉");        
    }else{
      hotspring = "";
    }
    if(dawn=="y"){  //有條件的加入sql式中
      this.category.push("迎曙光");        
    }else{
      dawn = "";
    }
    if(musteat=="y"){  //有條件的加入sql式中
      this.category.push("必吃不可");        
    }else{
      musteat = "";
    }
    if(exhibtion=="y"){  //有條件的加入sql式中
      this.category.push("看展覽");        
    }else{
      exhibtion = "";
    }
    if(seaview=="y"){  //有條件的加入sql式中
      this.category.push("看海景");        
    }else{
      seaview = "";
    }
    if(summer=="y"){  //有條件的加入sql式中
      this.category.push("夏天戲水");        
    }else{
      summer = "";
    }
    if(date=="y"){  //有條件的加入sql式中
      this.category.push("浪漫約會");        
    }else{
      date = "";
    }
    if(seabay=="y"){  //有條件的加入sql式中
      this.category.push("海灣旅遊");        
    }else{
      seabay = "";
    }
    if(sunset=="y"){  //有條件的加入sql式中
      this.category.push("夕陽");        
    }else{
      sunset = "";
    }
    if(nationalpark=="y"){  //有條件的加入sql式中
      this.category.push("國家公園");        
    }else{
      nationalpark = "";
    }
    if(nationalscenic=="y"){  //有條件的加入sql式中
      this.category.push("國家風景區");        
    }else{
      nationalscenic = "";
    }
    if(nationalforest=="y"){  //有條件的加入sql式中
      this.category.push("國家森林遊樂區");        
    }else{
      nationalforest = "";
    }
    if(oldstreet=="y"){  //有條件的加入sql式中
      this.category.push("逛老街");        
    }else{
      oldstreet = "";
    }
    if(nightstreet=="y"){  //有條件的加入sql式中
      this.category.push("逛夜市");        
    }else{
      nightstreet = "";
    }
    if(tribetour=="y"){  //有條件的加入sql式中
      this.category.push("部落旅遊");        
    }else{
      tribetour = "";
    }
    if(museum=="y"){  //有條件的加入sql式中
      this.category.push("博物館");        
    }else{
      museum = "";
    }
    if(biketour=="y"){  //有條件的加入sql式中
      this.category.push("單車旅遊");        
    }else{
      biketour = "";
    }

    if(foresttrail=="y"){  //有條件的加入sql式中
      this.category.push("森林步道");        
    }else{
      foresttrail = "";
    }
    if(barrierfree=="y"){  //有條件的加入sql式中
      this.category.push("無障礙");        
    }else{
      barrierfree = "";
    }
    if(moutaintrail=="y"){  //有條件的加入sql式中
      this.category.push("登山步道");        
    }else{
      moutaintrail = "";
    }
    if(hakka=="y"){  //有條件的加入sql式中
      this.category.push("漫遊客庄");        
    }else{
      hakka = "";
    }
    if(kol=="y"){  //有條件的加入sql式中
      this.category.push("網美必拍");        
    }else{
      kol = "";
    }
    if(nightview=="y"){  //有條件的加入sql式中
      this.category.push("賞夜景");        
    }else{
      nightview = "";
    }
    if(flowerview=="y"){  //有條件的加入sql式中
      this.category.push("賞花");        
    }else{
      flowerview = "";
    }
    if(battlefield=="y"){  //有條件的加入sql式中
      this.category.push("戰地文化");        
    }else{
      battlefield = "";
    }
    if(lighthouse=="y"){  //有條件的加入sql式中
      this.category.push("燈塔");        
    }else{
      lighthouse= "";
    }
    if(familyfriendly=="y"){  //有條件的加入sql式中
      this.category.push("親子共遊");        
    }else{
      familyfriendly = "";
    }
    if(art=="y"){  //有條件的加入sql式中
      this.category.push("藝術");        
    }else{
      art = "";
    }
    if(railway=="y"){  //有條件的加入sql式中
      this.category.push("鐵道旅遊");        
    }else{
      railway = "";
    }
    if(viewingplatform=="y"){  //有條件的加入sql式中
      this.category.push("觀景平台");        
    }else{
      viewingplatform = "";
    }
    // this.exampletag = this.examplebutton.split(',')
    // console.log(this.exampletag)
  }
  
  // ngAfterViewInit() : void{
  //   setTimeout(() => {
  //     console.log(this.mapElement.nativeElement.innerText);  //防止讀太快讀不到nativeElement
  //   }, 1000);
  //   this.map = new google.maps.Map(this.mapElement.nativeElement, 
  //     {
  //         center: { lat: -34.9011, lng: -56.1645 },
  //         zoom: 15
  //     });
  // }

  async presentLoading() { //等待Sign
    const loading = await this.loadingController.create({
      message: '添加中',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  // nextpage(){   
  //   console.log(this.sql); 
  //   // 先將全部資料導入，除於八? 按照長度顯示?
  //   this.datanum = this.datanum+5;
  //   this.sqliteDB.getAttractionsbycondition(this.sql,this.datanum).then(res => {
  //     this.alldata_new = res 
  //     // this.alldata = res 

  //     console.log(this.alldata_new +"新資料")
  //     // console.log(this.alldata);  
  //     this.alldata_new.forEach(element => {
  //       this.geocoder.geocode({ 'address': element.Address },  (results, status)  => { //先找到當地的經緯度 
  //         let pos;
  //         if (status == google.maps.GeocoderStatus.OK) {
  //             pos = {                                         //目標經緯度
  //               lat: results[0].geometry.location.lat(),
  //               lng: results[0].geometry.location.lng()
  //             };    
  //             // let watch = this.geolocation.watchPosition();
  //             // watch.subscribe((data) => {
  //             //  // 兩者合併算距離
  //             //  console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(data.coords.latitude,data.coords.longitude)));
  //             if(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng))>=1000){
    
  //                this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng))/1000;
  //                this.distance = Math.round(this.distance);
  //                if(this.distance>this.data.distance){
  //                   console.log("太遠了");
  //                   this.alldata_new.splice(this.alldata_new.indexOf(element),1);
  //                } 
  //                this.distance = this.distance +"公里";
  //                element.distance = this.distance;
                 
  //              }else{
  //               this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(this.exampleLat,this.exampleLng));
  //               this.distance = Math.round(this.distance);
  //               if(this.distance/1000>this.data.distance){
  //                 console.log("太遠了");
  //                 this.alldata_new.splice(this.alldata_new.indexOf(element),1);
  //              } 
  //               this.distance = this.distance +"公尺";
  //               element.distance = this.distance;
  //             }
  //              // 四捨五入
  //             // });                
  //         }  
  //         else{
  //           element.Aname = "失敗了";
  //         }   
  //       });
  //     }); 
  //     console.log(this.alldata_new +"資料1234")  
  //     this.alldata.push(this.alldata_new)  //將新爬的data放入資料庫
  //     console.log(this.alldata) 
  //   })
  //   // this.alldata.push(this.alldata_new)  //將新爬的data放入資料庫
    
  //   console.log(this.alldata+"hello ")     
  // }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '系統',
      // subHeader: 'Subtitle',
      message: '此景點已經在你的收藏裡了喔!',
      buttons: ['確認']
    });

    await alert.present();
  }

  UpdateCollection(aname,photo,item) {   
    this.lock = 0;
    this.favorite.place= aname;
    console.log(this.favorite.place)
    this.favorite.img = photo
    this.favorite.link = item.link
    this.favorite.tag = item.tag
    this.storage.getItem('datas4').then((val) => { //放進本地端的儲存機制 先拿出原本的資料然後Push進去
      if(val.findIndex(x => x.place === this.favorite.place)>=1){
        this.presentAlert() //彈出視窗 提醒使用者
        console.log("重複了")
      }else{
        this.presentLoading();
        console.log("沒重複")
        val.push(this.favorite) 
        this.storage.setItem('datas4',val);
      }
    });  
    this.alldata.forEach(element => { //更新favorite欄位
      if(element.Aname==this.favorite.place){ //如果重複位置則UPDATE  
        this.tourist = element
        this.tourist.favorite = "y" 
        console.log(this.tourist)
        // this.service.updateTourist(this.tourist,element.id).then(() => {
        // });
      }else{  //如果位置沒重複則update (只會發生一次?) 當有兩個地點的時候
        // this.service.addFavorite(this.favorite).then(() => {
        // });
      }
    });
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

    // this.sqliteDB.updateAttraction(aname).then(() => {
    // });
    
    //this.service.collect(aname)
    // for(let i = 0; i < this.alldata.length; i++) {

    //   if(this.alldata[i] == item){
    //     this.alldata.splice(i, 1);
    //   }

    // }    
  }
  // doRefresh(event) {
  //   console.log('Begin async operation');  
  //   setTimeout(() => {
  //     this.nextpage()
  //     console.log("test")
  //     event.target.complete();
  //     // if (this.posts.length < this.limit) {
  //     //   event.target.disabled = true;
  //     // }
  //   }, 2000);
  // } 
  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.backButton.onClick = () => {
      // handle custom action here
      let navigationExtras: NavigationExtras = {
        queryParams: {
          special: JSON.stringify(this.selection)
        }
      };
      this.nav.navigateRoot(['tabs/tab1/phase22'], navigationExtras);
    };
  }
  showdata(){
    console.log(this.tourists) 
  }
  onshow(url){ //連接到blog資訊
    const browser = this.iab.create(url);
  }
  changecategory(value){
    if(value=="主題樂園"){
      this.service.changeTourist("themepark").subscribe(res => {
        this.alldata = res;
        // this.tourists= res; //接受firebase裡所有的欄位
        console.log(this.alldata)
      });
      // this.alldata =this.service.changeTourist("themepark")
    }
    if(value=="文青必去"){
      this.service.changeTourist("hipster").subscribe(res => {
        this.alldata = res;   
          
        console.log(this.alldata)
      });
    }
    if(value=="水上運動"){
      this.service.changeTourist("watersport").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="古蹟巡遊"){
      this.service.changeTourist("historic").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="台灣燈會"){
      this.service.changeTourist("latern").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="台灣觀巴"){
      this.service.changeTourist("tourbus").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="必買"){
      this.service.changeTourist("mustbuy").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="打卡熱點"){
      this.service.changeTourist("hotspot").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="生態體驗"){
      this.service.changeTourist("creature").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="吃海鮮"){
      this.service.changeTourist("seafood").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="地質奇觀"){
      this.service.changeTourist("weirdscene").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="寺廟祈福"){
      this.service.changeTourist("temple").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="婚紗拍攝"){
      this.service.changeTourist("weddingdress").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="泡溫泉"){
      this.service.changeTourist("hotspring").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="迎曙光"){
      this.service.changeTourist("dawn").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="必吃不可"){
      this.service.changeTourist("musteat").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="看展覽"){
      this.service.changeTourist("exhibition").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="看海景"){
      this.service.changeTourist("seaview").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="夏天戲水"){
      this.service.changeTourist("summer").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="浪漫約會"){
      this.service.changeTourist("date").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="海灣旅遊"){
      this.service.changeTourist("seabay").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="夕陽"){
      this.service.changeTourist("sunset").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="國家公園"){
      this.service.changeTourist("nationalpark").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="國家風景區"){
      this.service.changeTourist("nationalscenic").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="國家森林遊樂區"){
      this.service.changeTourist("nationalforest").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="逛老街"){
      this.service.changeTourist("oldstreet").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="逛夜市"){
      this.service.changeTourist("nightstreet").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="部落旅遊"){
      this.service.changeTourist("tribetour").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="博物館"){
      this.service.changeTourist("museum").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="單車旅遊"){
      this.service.changeTourist("biketour").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="森林步道"){
      this.service.changeTourist("foresttrail").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="無障礙"){
      this.service.changeTourist("barrierfree").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="登山步道"){
      this.service.changeTourist("moutaintrail").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="漫遊客庄"){
      this.service.changeTourist("hakka").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="網美必拍"){
      this.service.changeTourist("kol").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="賞夜景"){
      this.service.changeTourist("nightview").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="賞花"){
      this.service.changeTourist("flowerview").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="戰地文化"){
      this.service.changeTourist("battlefield").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="燈塔"){
      this.service.changeTourist("lighthouse").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="親子共遊"){
      this.service.changeTourist("familyfriendly").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="藝術"){
      this.service.changeTourist("art").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="鐵道旅遊"){
      this.service.changeTourist("railway").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }
    if(value=="觀景平台"){
      this.service.changeTourist("viewingplatform").subscribe(res => {
        this.alldata = res;       
        console.log(this.alldata)
      });
    }


  }
} 