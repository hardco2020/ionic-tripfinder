import { Component, OnInit ,NgZone ,ViewChild, AfterContentInit} from '@angular/core';
import { ControllerserviceService,Favorites } from '../../controllerservice.service'
import { ActivatedRoute,Router } from '@angular/router';
//import { ConsoleReporter } from 'jasmine';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { NavController, LoadingController } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-outcome',
  templateUrl: './outcome.page.html',
  styleUrls: ['./outcome.page.scss'],
})
export class OutcomePage implements OnInit {
   // 透過 url 將 selection 傳遞到此頁面
   favorite : Favorites = {
    place: "測試",
    collection: 1 
   };
   favorites: Favorites[]; //load進所有現存資料
   data: any;
   map;
   distance: any;
   openingorNot : any;
   openPeriod : any;
   phoneNumber : any;
   example ="台北市中正區開封街一段14巷劉山東牛肉麵"; //到時候會改成所有地點的資料
   constructor(private route: ActivatedRoute, private router: Router ,private zone: NgZone,private geolocation: Geolocation , public service : ControllerserviceService, private loadingController: LoadingController,private nav: NavController) { 
     this.route.queryParams.subscribe(param=>{
       if(param && param.special){
         this.data = JSON.parse(param.special);
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
    //此處先用if else處理篩選 
    //等待竹秀將phase2傳值到此處
    
    
    //篩選出一系列地點後根據使用者的距離 金錢等等要求 做google place進一步二階段篩選
    this.GoogleAutocomplete.getPlacePredictions({ input: this.example },  //用此地址作為範例
      (predictions, status) => {
        this.zone.run(() => {
          predictions.forEach((prediction) => {  
              console.log(prediction)
              let service = new google.maps.places.PlacesService(this.map);  //將算出的prediction id丟進detail來找到進階資訊
              service.getDetails(
                {placeId: prediction.place_id},
                  (results, status) =>{
                    console.log(results);
                    console.log(results.opening_hours.open_now);  //知道現在有沒有開 
                    if(results.opening_hours.open_now==false){
                      this.openingorNot = "休業中";
                    }else{
                      this.openingorNot = "營業中";
                    }
                    this.openPeriod = results.opening_hours.weekday_text;
                    this.phoneNumber = results.formatted_phone_number;
                  }
             );
        });
      });
    });
    ////////////找到兩地距離  1.先找到兩個地方的經緯度 再使用function計算出距離
    this.geocoder.geocode({ 'address': this.example},  (results, status)  => { //先找到當地的經緯度 
      let pos;
        if (status == google.maps.GeocoderStatus.OK) {
            pos = {                                         //目標經緯度
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            };
            this.geolocation.getCurrentPosition().then((resp) => {  //自己的經緯度
              // resp.coords.latitude
              // resp.coords.longitude
             }).catch((error) => {
               console.log('Error getting location', error);
            });
            let watch = this.geolocation.watchPosition();
            watch.subscribe((data) => {
             // 兩者合併算距離
             console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(data.coords.latitude,data.coords.longitude)));
             if(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(data.coords.latitude,data.coords.longitude))>=1000){

               this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(data.coords.latitude,data.coords.longitude))/1000;
               this.distance = Math.round(this.distance);
               this.distance = this.distance +"公里";
             }else{
              this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(data.coords.latitude,data.coords.longitude));
              this.distance = Math.round(this.distance);
              this.distance = this.distance +"公尺";
             }
             // 四捨五入
            });      
        }
    });
  
    console.log(this.distance);
  }

  UpdateCollection() {  
    //this.favorite.place=this.example;
    this.favorites.forEach(element => {
      if(element.place==this.favorite.place){ //如果重複位置則UPDATE  
        this.favorite.collection = element.collection + 1 ;
        this.service.updateFavorite(this.favorite, element.id).then(() => {
        });
      }else{
        this.service.addFavorite(this.favorite).then(() => {
        });
      }
      
    });
    console.log(this.favorite);
  }
 
}
