import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Attraction } from './attraction'; //import services song.ts class name, original is Song, Song=>Attraction
import { Restaurant } from './restaurant';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})

export class DbService {
  private storage: SQLiteObject;
  attractionList = new BehaviorSubject([]); //attraction lsit, original is songList
  attractionListbycondition = new BehaviorSubject([]);
  restaurantList = new BehaviorSubject([]); //attraction lsit, original is songList
  restaurantListbycondition = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'positronx_db.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
      });
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }
 
  fetchAttractions(): Observable<Attraction[]> { //services song.ts class name, original is Song, Song[]=>Attraction[], fetchSongs()=>fetchAttractions() 
    return this.attractionList.asObservable();
  }

  fetchAttractionsbycondition(): Observable<Attraction[]> { //services song.ts class name, original is Song, Song[]=>Attraction[], fetchSongs()=>fetchAttractions() 
    return this.attractionListbycondition.asObservable();
  }
  
  fetchRestaurants(): Observable<Restaurant[]> { //services song.ts class name, original is Song, Song[]=>Attraction[], fetchSongs()=>fetchAttractions() 
    return this.restaurantList.asObservable();
  }

  fetchRestaurantsbycondition(): Observable<Restaurant[]> { //services song.ts class name, original is Song, Song[]=>Attraction[], fetchSongs()=>fetchAttractions() 
    return this.restaurantListbycondition.asObservable();
  }

    // Render fake data
  getFakeData() {
    this.httpClient.get(
      'assets/google_attractions.json', //get the sql or json file 
      {responseType: 'text'}
    ).subscribe(data => {
      this.sqlPorter.importJsonToDb(this.storage, data)
        .then(_ => {
          this.getAttractions();   //original is getSongs, getSongs=>getAttractions
          this.getRestaurants();
          this.isDbReady.next(true);
        })
        .catch(error => console.error(error));
    });
  }

  // Get list
  getAttractions(){  //original is getSongs, getSongs=>getAttractions
    return this.storage.executeSql('SELECT * FROM AttractionInfo', []).then(res => {
      let items: Attraction[] = []; //services song.ts class name, original is Song, Song[]=>Attraction[]
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({  //getting all the columns by column names
            Aid: res.rows.item(i).Aid,  //變數名: res.rows.item(i).資料表欄位名,
            Aname: res.rows.item(i).Aname,  
            photo: res.rows.item(i).photo,
            GoogleClass: res.rows.item(i).GoogleClass,
            Phone: res.rows.item(i).Phone,
            Address: res.rows.item(i).Address,
            Rate: res.rows.item(i).Rate,
            InorOut: res.rows.item(i).InorOut,
            StaticorDynamic: res.rows.item(i).StaticorDynamic,
            Netbeauty: res.rows.item(i).Netbeauty, 
            Hipster: res.rows.item(i).Hipster,  
            NearMountain: res.rows.item(i).NearMountain, 
            NearSea: res.rows.item(i).NearSea,  
            Shopping: res.rows.item(i).Shopping,  
            Exhibition: res.rows.item(i).Exhibition,  
            History: res.rows.item(i).History,  
            NightView: res.rows.item(i).NightView,  
            favorite: res.rows.item(i).favorite
           });
        }
      }
      this.attractionList.next(items);  //Line15宣告的List
    });
  }

  getAttractionsbycondition(sqlText): Promise<Attraction[]>{  //original is getSongs, getSongs=>getAttractions
    return this.storage.executeSql(sqlText, []).then(res => {
      let items: Attraction[] = []; //services song.ts class name, original is Song, Song[]=>Attraction[]
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({  //getting all the columns by column names
            Aid: res.rows.item(i).Aid,  //變數名: res.rows.item(i).資料表欄位名,
            Aname: res.rows.item(i).Aname,  
            photo: res.rows.item(i).photo,
            GoogleClass: res.rows.item(i).GoogleClass,
            Phone: res.rows.item(i).Phone,
            Address: res.rows.item(i).Address,
            Rate: res.rows.item(i).Rate,
            InorOut: res.rows.item(i).InorOut,
            StaticorDynamic: res.rows.item(i).StaticorDynamic,
            Netbeauty: res.rows.item(i).Netbeauty, 
            Hipster: res.rows.item(i).Hipster,  
            NearMountain: res.rows.item(i).NearMountain, 
            NearSea: res.rows.item(i).NearSea,  
            Shopping: res.rows.item(i).Shopping,  
            Exhibition: res.rows.item(i).Exhibition,  
            History: res.rows.item(i).History,  
            NightView: res.rows.item(i).NightView,  
            favorite: res.rows.item(i).favorite, 
           });
        }
      }
      return items;
    });

    
  }

  // Add
  addAttraction(Aname, GoogleClass, Phone, Address, Rate) { //get all column variables
    let data = [Aname, GoogleClass, Phone, Address, Rate]; // combine all variables into a dataset
    return this.storage.executeSql('INSERT INTO AttractionInfo (Aname, photo, GoogleClass, Phone, Address, Rate) VALUES (?, ?, ?, ?, ?, ?, ?)', data)
    .then(res => {
      this.getAttractions();
    });
  }
 
  // Get single object
  getAttraction(Aid): Promise<Attraction> {
    return this.storage.executeSql('SELECT * FROM AttractionInfo WHERE Aid = ?', [Aid]).then(res => { 
      return {
        Aid: res.rows.item(0).Aid,  //變數名: res.rows.item(0).資料表欄位名, 因為只有一筆，所以只抓第0列
        Aname: res.rows.item(0).Aname,  
        photo: res.rows.item(0).photo,  
        GoogleClass: res.rows.item(0).GoogleClass,
        Phone: res.rows.item(0).Phone,
        Address: res.rows.item(0).Address,
        Rate: res.rows.item(0).Rate,  
        InorOut: res.rows.item(0).InorOut,
        StaticorDynamic: res.rows.item(0).StaticorDynamic,
        Netbeauty: res.rows.item(0).Netbeauty, 
        Hipster: res.rows.item(0).Hipster,  
        NearMountain: res.rows.item(0).NearMountain, 
        NearSea: res.rows.item(0).NearSea,  
        Shopping: res.rows.item(0).Shopping,  
        Exhibition: res.rows.item(0).Exhibition,  
        History: res.rows.item(0).History,  
        NightView: res.rows.item(0).NightView,  
        favorite: res.rows.item(0).favorite, 
      }
    });
  }

  // Update
  updateAttraction(Aid) {
    
    return this.storage.executeSql('UPDATE AttractionInfo SET favorite = "y" WHERE Aid = ?', [Aid] ).then(data => {
      this.getAttractions();
    })
  }

  // Delete
  deleteAttraction(Aid) {
    return this.storage.executeSql('DELETE FROM AttractionInfo WHERE Aid = ?', [Aid])
    .then(_ => {
      this.getAttractions();
    });
  }



  getRestaurants(){  //original is getSongs, getSongs=>getAttractions
    return this.storage.executeSql('SELECT * FROM FoodInfo', []).then(res => {
      let items: Restaurant[] = []; //services song.ts class name, original is Song, Song[]=>Attraction[]
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({  //getting all the columns by column names
            Aid: res.rows.item(i).Aid,  //變數名: res.rows.item(i).資料表欄位名,
            Aname: res.rows.item(i).Aname,  
            photo: res.rows.item(i).photo,
            GoogleClass: res.rows.item(i).GoogleClass,
            Phone: res.rows.item(i).Phone,
            Address: res.rows.item(i).Address,
            Rate: res.rows.item(i).Rate,
           });
        }
      }
      this.restaurantList.next(items);  //Line15宣告的List
    });
  }

  getRestaurantsbycondition(sqlText): Promise<Restaurant[]>{  //original is getSongs, getSongs=>getAttractions
    return this.storage.executeSql(sqlText, []).then(res => {
      let items: Restaurant[] = []; //services song.ts class name, original is Song, Song[]=>Attraction[]
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({  //getting all the columns by column names
            Aid: res.rows.item(i).Aid,  //變數名: res.rows.item(i).資料表欄位名,
            Aname: res.rows.item(i).Aname,  
            photo: res.rows.item(i).photo,
            GoogleClass: res.rows.item(i).GoogleClass,
            Phone: res.rows.item(i).Phone,
            Address: res.rows.item(i).Address,
            Rate: res.rows.item(i).Rate,
           });
        }
      }
      return items;
    });

    
  }

  // Add
  addRestaurant(Aname, GoogleClass, Phone, Address, Rate) { //get all column variables
    let data = [Aname, GoogleClass, Phone, Address, Rate]; // combine all variables into a dataset
    return this.storage.executeSql('INSERT INTO FoodInfo (Aname, photo, GoogleClass, Phone, Address, Rate) VALUES (?, ?, ?, ?, ?, ?, ?)', data)
    .then(res => {
      this.getRestaurants();
    });
  }
 
  // Get single object
  getRestaurant(Aid): Promise<Restaurant> {
    return this.storage.executeSql('SELECT * FROM FoodInfo WHERE Aid = ?', [Aid]).then(res => { 
      return {
        Aid: res.rows.item(0).Aid,  //變數名: res.rows.item(0).資料表欄位名, 因為只有一筆，所以只抓第0列
        Aname: res.rows.item(0).Aname,  
        photo: res.rows.item(0).photo,  
        GoogleClass: res.rows.item(0).GoogleClass,
        Phone: res.rows.item(0).Phone,
        Address: res.rows.item(0).Address,
        Rate: res.rows.item(0).Rate,  
        
      }
    });
  }

  // Update
  updateRestaurant(Aid) {
    
    return this.storage.executeSql('UPDATE FoodInfo SET favorite = "y" WHERE Aid = ?', [Aid] ).then(data => {
      this.getRestaurants();
    })
  }

  // Delete
  deleteRestaurant(Aid) {
    return this.storage.executeSql('DELETE FROM FoodInfo WHERE Aid = ?', [Aid])
    .then(_ => {
      this.getRestaurants();
    });
  }
}

//餐廳API
