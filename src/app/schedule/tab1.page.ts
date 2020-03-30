import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
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
      title: '熱門景點',
      subtitle: '高雄市'
    },
    {
      img: 'assets/img/search/2.jpg',
      title: '熱門景點',
      subtitle: '合歡山'
    },
    {
      img: 'assets/img/search/3.jpg',
      title: '哪裡哪裡',
      subtitle: 'Good'
    },
    {
      img: 'assets/img/search/4.jpg',
      title: '熱門景點4',
      subtitle: ''
    }
  ];

  // 讓圖片進行輪播
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    speed: 2000,
   };
  constructor(public nav: NavController) {}
  turnpage(){   // 換頁到phase1
    this.nav.navigateRoot(['selecting-phase1']);
  }

}
