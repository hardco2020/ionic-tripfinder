import { Component, OnInit, NgZone ,ViewChild} from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { ControllerserviceService } from '../controllerservice.service'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { location } from '../location.model';
import { Platform } from '@ionic/angular';


declare var google;

@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.page.html',
  styleUrls: ['./view-detail.page.scss'],
})
export class ViewDetailPage implements OnInit {
  loadedDetail: location;
  api_key = 'AIzaSyCMjg0lGC43K_RsV687kghZ5qTAbPnQAMo';
  data:any;
  map;
  distance: any;
  openingorNot : any;
  openPeriod : any;
  phoneNumber : any;
  review : any;
  example ="台北市中正區開封街一段14巷劉山東牛肉麵";
  currentLat : any;
  currentLng: any;
  constructor(
     private zone: NgZone,
     private geolocation: Geolocation , 
     private activatedRoute: ActivatedRoute,
     private router: Router,
     private platform : Platform,
     private navCtrl: NavController,
     public service : ControllerserviceService) {
     this.data={
      distance:2
     }
  }
  @ViewChild('mapElement',{static:true}) mapElement;
  // geolocation = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCMjg0lGC43K_RsV687kghZ5qTAbPnQAMo';
  geocoder = new google.maps.Geocoder;
  GoogleAutocomplete = new google.maps.places.AutocompleteService();
  ngOnInit(): void{
    this.activatedRoute.paramMap.subscribe(paraMap =>{
      if(!paraMap.has('detailId')){
        //redirect
        this.router.navigate(['/recipes']);
        return;
      }
      else{
        
      }
      const detailId = parseInt(paraMap.get('detailId'));
      let test = paraMap.get('detailId');
      this.loadedDetail = this.service.getDetail(test);
      this.phoneNumber = test;
      this.openPeriod = 10;
      this.distance = 14;
      
    }) //obeservable? 用法
    
    this.geocoder.geocode({ 'address': "高雄市鹽埕區五福四路19號"},  (results, status)  => { //先找到當地的經緯度 
      let pos;
      if (status == google.maps.GeocoderStatus.OK) {
          this.phoneNumber = 123456
          pos = {                                         //目標經緯度
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          };
          this.currentLat = pos.lat;
          this.currentLng = pos.lng;
          // let watch = this.geolocation.watchPosition();
          // watch.subscribe((data) => {
          //  // 兩者合併算距離
          //  console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(data.coords.latitude,data.coords.longitude)));
          //  if(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(data.coords.latitude,data.coords.longitude))>=1000){

          //    this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(data.coords.latitude,data.coords.longitude))/1000;
          //    this.distance = Math.round(this.distance);
          //    this.distance = this.distance +"公里";
             
          //  }else{
          //   this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(data.coords.latitude,data.coords.longitude));
          //   this.distance = Math.round(this.distance);
          //   this.distance = this.distance +"公尺";

          //  }
           // 四捨五入
          // });      
          
      }     
    });
  }
  ngAfterViewInit() : void{
    setTimeout(() => {
      console.log(this.mapElement.nativeElement.innerText);  //防止讀太快讀不到nativeElement
    }, 1500);
    this.map = new google.maps.Map(this.mapElement.nativeElement, 
      {
          center: { lat: -34.9011, lng: -56.1645 },
          zoom: 15
      });
    //此處先用if else處理篩選 
    //等待竹秀將phase2傳值到此處
    //篩選出一系列地點後根據使用者的距離 金錢等等要求 做google place進一步二階段篩選
    this.GoogleAutocomplete.getPlacePredictions({ input: this.loadedDetail.Aname},  //用此地址作為範例
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
                      this.openingorNot = false;
                    }else{
                      this.openingorNot = true;
                    }
                    this.openPeriod = results.opening_hours.weekday_text;
                    this.phoneNumber = results.formatted_phone_number;
                    this.review = results.reviews[0].text;
                  }
             );
        });
      });
    });
    this.geolocation.getCurrentPosition().then((resp) => {  //自己的經緯度
              console.log(resp.coords.latitude);
              this.distance = resp.coords.latitude;
              // resp.coords.latitude
              // resp.coords.longitude
             }).catch((error) => {
               this.distance = 123;
               console.log('Error getting location', error);
    });
    // this.geocoder.geocode({ 'address': "高雄市鹽埕區五福四路19號"},  (results, status)  => { //先找到當地的經緯度 
    //   let pos;
    //   if (status == google.maps.GeocoderStatus.OK) {
    //       this.phoneNumber = 123456
    //       pos = {                                         //目標經緯度
    //         lat: results[0].geometry.location.lat(),
    //         lng: results[0].geometry.location.lng()
    //       };
    //       this.geolocation.getCurrentPosition().then((resp) => {  //自己的經緯度
    //         console.log(resp.coords.latitude);
    //         // resp.coords.latitude
    //         // resp.coords.longitude
    //        }).catch((error) => {
    //          console.log('Error getting location', error);
    //       });
    //       let watch = this.geolocation.watchPosition();
    //       watch.subscribe((data) => {
    //        // 兩者合併算距離
    //        console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(data.coords.latitude,data.coords.longitude)));
    //        if(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(data.coords.latitude,data.coords.longitude))>=1000){

    //          this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(data.coords.latitude,data.coords.longitude))/1000;
    //          this.distance = Math.round(this.distance);
    //          this.distance = this.distance +"公里";
             
    //        }else{
    //         this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(data.coords.latitude,data.coords.longitude));
    //         this.distance = Math.round(this.distance);
    //         this.distance = this.distance +"公尺";

    //        }
    //        // 四捨五入
    //       });      
          
    //   }     
    // });
    ////////////找到兩地距離  1.先找到兩個地方的經緯度 再使用function計算出距離
    
  }
  back(){
    this.navCtrl.back();
  }

}
