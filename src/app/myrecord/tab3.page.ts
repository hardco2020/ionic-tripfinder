import { Component, OnInit ,NgZone ,ViewChild, AfterContentInit} from '@angular/core';
import { DbService } from '../services/db.service';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { ControllerserviceService,Favorites,TouristData,googleInfor } from '../../app/controllerservice.service'
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page  implements OnInit {

  alldata: any[] = [];
  // api_key = 'AIzaSyCMjg0lGC43K_RsV687kghZ5qTAbPnQAMo';
  favfood=[
    { 
      img : 'asset/img/selecting_phase/icon.png',
      place: '您還沒有任何景點喔',
      collection: 1,
      link: '123'     
    }
  ];

  constructor(
    private storage: NativeStorage,
    public iab : InAppBrowser,
    public service : ControllerserviceService, 
    private sqliteDB: DbService,
    private nav : NavController
  ) {}

  ngOnInit(): void{ //sqliteDB DBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDB
    // this.service.favoriteTourist().subscribe(res => {
    //   this.alldata = res;
    //   // this.tourists= res; //接受firebase裡所有的欄位
    //   console.log(this.alldata)
    // });
    // console.log(this.alldata);
    this.storage.getItem('data3') //初始化 如果沒有任何資料就放favfood進去
    .then(
    data => console.log(data),
    error => this.storage.setItem('data3',this.favfood)
    );
    this.storage.getItem('datas4') //初始化 如果沒有任何資料就放favfood進去
    .then(
    val =>{ 
      console.log(val)
      this.alldata = val
      //如果傳出的長度為0就加入一個新的欄位 為您還沒有任何景點收藏
      if(this.alldata.length>1){
        this.alldata.splice(0,1) //刪除開頭用來顯示還沒有任何錯誤的資料
      }
    error => this.storage.setItem('datas4',this.favfood)
    });   
  }
  changetotourist(){
    // this.service.favoriteTourist().subscribe(res => {
    //   this.alldata = res;
    //   // this.tourists= res; //接受firebase裡所有的欄位
    //   // console.log(this.alldata)
    // });
    this.storage.getItem('datas4').then((val) => {
      console.log(val);
      this.alldata = val;
      //如果傳出的長度為0就加入一個新的欄位 為您還沒有任何景點收藏
      if(this.alldata.length>1){
        this.alldata.splice(0,1) //刪除開頭用來顯示還沒有任何錯誤的資料
      } 
    });  
    // this.storage.setItem('keyOfData', JSON.stringify(this.alldata));
  }
  changetofoodie(){
    // this.service.favoriteFoodie().subscribe(res => {
    //   this.alldata = res;
    //   // this.tourists= res; //接受firebase裡所有的欄位
    //   // console.log(this.alldata)
    // });
    this.storage.getItem('datas3').then((val) => {
      console.log(val);
      this.alldata = val;
      //如果傳出的長度為0就加入一個新的欄位 為您還沒有任何景點收藏
      if(this.alldata.length>1){
        this.alldata.splice(0,1) //刪除開頭用來顯示還沒有任何錯誤的資料
      } 
    });  
  }
  onshow(url){ //連接到blog資訊
    const browser = this.iab.create(url);
  }
  // back(name){ 
  //   this.nav.navigateRoot(['outcome',name]);
  //   location.reload();
   
  // }

}
