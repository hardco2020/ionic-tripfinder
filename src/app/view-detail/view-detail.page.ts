import { Component, OnInit, NgZone ,ViewChild} from '@angular/core';

import { ControllerserviceService } from '../controllerservice.service'
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.page.html',
  styleUrls: ['./view-detail.page.scss'],
})
export class ViewDetailPage implements OnInit {
  data:any;
  map;
   distance: any;
   openingorNot : any;
   openPeriod : any;
   phoneNumber : any;
   example ="台北市中正區開封街一段14巷劉山東牛肉麵";
   constructor(private zone: NgZone,private geolocation: Geolocation , public service : ControllerserviceService) {
    this.data={
      distance:2
    }
   }
  
   @ViewChild('mapElement',{static:true}) mapElement;
   
  geocoder = new google.maps.Geocoder;
  GoogleAutocomplete = new google.maps.places.AutocompleteService();
  ngOnInit(): void{
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
                      this.openingorNot = false;
                    }else{
                      this.openingorNot = true;
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


}
