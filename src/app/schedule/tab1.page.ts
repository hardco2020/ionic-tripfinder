
import { Component, OnInit ,NgZone ,ViewChild, AfterContentInit} from '@angular/core';
import { NavController } from '@ionic/angular';
import { ControllerserviceService,Favorites,FavFoods,googleInfor } from '../controllerservice.service';
import { VirtualTimeScheduler } from 'rxjs';
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
    });

    console.log(this.favorites);
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
  testshow(){
    this.favorites.map(element => {
      this.slides.push(element);
    });
  }
}
