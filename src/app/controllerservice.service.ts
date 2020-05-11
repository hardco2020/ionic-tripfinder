import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
declare var google;
export interface Favorites {
  place: string;
  collection: number;
}
export interface googleInfor {
    distance: number;
    openingorNot: any;
    phoneNumber: number;
    openPeriod: number
}
@Injectable({
  providedIn: 'root'
})
export class ControllerserviceService {
  private FavoritesCollection: AngularFirestoreCollection<Favorites>; //初始化maybe?
  private Favorites: Observable<Favorites[]>;
  constructor(db: AngularFirestore) { 
    this.FavoritesCollection = db.collection<Favorites>('Favorites');
    this.Favorites = this.FavoritesCollection.snapshotChanges().pipe(  //snapchange的固定建置方法
      map( actions=>{
      return actions.map(a=>{
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return{id,...data};
      })
    }))
  }
  alldata = [{      //所有的data
    "Aid": 1,
    "Aname": "大立百貨空中遊樂園",
    "photo": "CmRaAAAAIClT_Ynie6i7diws5vPTvz4IK7-cyWX93fkUtbAnI2EkIORzchzhzZARIHaaF6vDQTx78ZEIEjNX55fzXE2v8aSZ2PArtcX8rP2a7JeimjeaerACyg9ftF37z6p0cBnwEhDEW3u4n-x7AeGI2F5ApFAsGhSFoyAOGS2JKfDqLSLgRjabwJKxyQ",
    "GoogleClass": "amusement_park",
    "Phone": "07 261 3060",
    "Address": "801台灣高雄市前金區五福三路59號RF",
    "Rate": 4.2
     },
     {
     "Aid": 2,
     "Aname": "澄清湖風景區 兒童樂園",
     "photo": "CmRaAAAAQNI4jsV8_g86CEU7tWjZQHtUOMN0mu3aL1sKekjMvWyGqCmyiz9miFN1v5WT6yoRh1KOIb_jmVK38p_Vfy60tcx8TI_hMJr9RQNSq-VtahYFp9OvIOGt5CGSssc_fyD0EhBpe0PveufVdBpENptCQqkqGhRd9VvD2vhgAxF_37fgh5eUlYENtw",
     "GoogleClass": "amusement_park",
     "Phone": "07 370 0821",
     "Address": "833台灣高雄市鳥松區",
     "Rate": 4
     },
     {
       "Aid": 3,
       "Aname": "鈴鹿賽道樂園",
       "photo": "CmRaAAAAG8PNms_SXLnkhz00HQX-67phd-iMq8tNWMXrV8Gsv_l_oaBzi04AqrZsN4cbbHiz3NynrvZU0hd0LnuJpFtj3YuH3Rtd9Z6bhN-3kiS63zMjLoPgunF8SNbpUDtjyqlMEhAyqYYRWyTYj5kKDW05xWOpGhTTJNhM9B8xsRScOXNXZI-rdnyaOA",
       "GoogleClass": "amusement_park",
       "Phone": "07 796 7766",
       "Address": "806台灣高雄市前鎮區中安路1-1號",
       "Rate": 4.3
     }
  ]
  getAlldetails(){
    return [...this.alldata];

  }
  getDetail(detailId: number) {
    return{
      ...this.alldata.find(detail =>{
      return detail.Aid === detailId
      })
    };
  }



  //////////////////最愛功能的的部分
  getFavorites() {
    return this.Favorites;
  }
 
  getFavorite(id) {
    return this.FavoritesCollection.doc<Favorites>(id).valueChanges();
  }
 
  updateFavorite(favorite: Favorites, id: string) {
    return this.FavoritesCollection.doc(id).update(favorite);
  }
 
  addFavorite(favorite: Favorites) {
    return this.FavoritesCollection.add(favorite);
  }
 
  removeFavorite(id) {
    return this.FavoritesCollection.doc(id).delete();
  }

}
