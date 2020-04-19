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
