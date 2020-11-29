
import { Component} from '@angular/core';
import { NavController } from '@ionic/angular';
import { ControllerserviceService,Favorites,FavFoods } from '../controllerservice.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html', 
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  // 圖片的位置  
  slides = [
    {
      img: 'assets/img/search/1.jpg',
      place: '合歡山',
      // subtitle: '高雄市',
      collection : 1
    },
    {
      img: 'assets/img/search/2.jpg',
      place: '合歡山',
      // subtitle: '合歡山',
      collection : 1
    },
    {
      img: 'assets/img/search/2.jpg',
      place: '合歡山',
      // subtitle: '合歡山',
      collection : 1
    },
    {
      img: 'assets/img/search/3.jpg',
      place: '哪裡哪裡',
      // subtitle: 'Good',
      collection : 1
    },
    {
      img: 'assets/img/search/3.jpg',
      place: '哪裡哪裡',
      // subtitle: 'Good',
      collection : 1
    },
    {
      img: 'assets/img/search/4.jpg',
      place: '熱門景點4',
      // subtitle: '',
      collection : 1
    }
  ];

  // 讓圖片進行輪播
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    speed: 2000,
   };
  favorites: Favorites[]; //load進所有現存資料
  favfoods: FavFoods[]; 
  geocoder = new google.maps.Geocoder;
  distance: any;
  constructor(public nav: NavController,public service : ControllerserviceService) {}
  ngOnInit(): void{
    this.service.getFavorites().subscribe(res => {
      this.favorites = res; //接受firebase裡所有的欄位
      this.favorites = this.favorites.sort(function (a, b) {
        return a.collection < b.collection ? 1 : -1;  //按照collection進行排序
      }) 
     
      this.slides[0]=this.favorites[0];
      this.slides[2]=this.favorites[1];
      this.slides[4]=this.favorites[2];
      // for(let i = 0; i < this.slides.length; i++) { bug
      //   this.slides[i]=this.favorites[i];
      // }  
      
    });
    this.service.getFavFoods().subscribe(res => {
      this.favfoods = res;
      this.favfoods = this.favfoods.sort(function (a, b) {
        return a.collection < b.collection ? 1 : -1;  //按照collection進行排序
      })
      this.slides[1]=this.favfoods[0];
      this.slides[3]=this.favfoods[1];
      this.slides[5]=this.favfoods[2];
      // }
      // this.geocoder.geocode({ 'address': "高雄市左營區明華一路58號"},  (results, status)  => { //先找到當地的經緯度 
      //   let pos;
      //   if (status == google.maps.GeocoderStatus.OK) {
      //       pos = {                                         //目標經緯度
      //         lat: results[0].geometry.location.lat(),
      //         lng: results[0].geometry.location.lng()
      //       };
      //       this.geolocation.getCurrentPosition().then((resp) => {  //自己的經緯度
      //         console.log(resp.coords.latitude);
      //         console.log(resp.coords.longitude);
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
      //          console.log(this.distance);
               
      //        }else{
      //         this.distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(data.coords.latitude,data.coords.longitude));
      //         this.distance = Math.round(this.distance);
      //         this.distance = this.distance +"公尺";
      //         console.log(this.distance);

      //        }
      //        // 四捨五入
      //       });      
            
      //   }
        
    // });
    });
    // this.androidPermissions .requestPermissions([this.androidPermissions.PERMISSION.WRITE_GSERVICES]);
    // console.log(this.favorites);
  }
  
  // ngAfterViewInit() : void{
  //   setTimeout(() => {
  //   }, 1000);
  //   this.favorites.map(element => {
  //     this.slides.push(element);
  //   });
  // }
  turnpage(){   // 換頁到phase1
    this.nav.navigateRoot(['selecting-phase1']);
  }

}
