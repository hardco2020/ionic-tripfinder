import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { SelectFormService } from '../select-form.service'

import { NgZone } from '@angular/core';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

declare var google;
@Component({
  selector: 'app-selecting-phase1',
  templateUrl: './selecting-phase1.page.html',
  styleUrls: ['./selecting-phase1.page.scss'],
})
export class SelectingPhase1Page implements OnInit {

  constructor(
    public nav: NavController, 
    private nativeGeocoder: NativeGeocoder,     // latlan <-> address change
    public zone: NgZone,
    private selectform: SelectFormService
    ) { 
      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      this.autocomplete = { input: '' };
      this.autocompleteItems = [];
    } //宣告nav函數來換頁
  private selection : any;

  ngOnInit() {
    this.distanceRange = 0;
  }
  
  // ngModel 變數值
  distanceRange:any;
  distanceValid:boolean = false;
  items: any;
  //google auto 變數
  lat: string;
  long: string;  
  autocomplete: { input: string; };
  autocompleteItems: any[];
  placeid: any;
  GoogleAutocomplete: any;
  
  options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5    
  }; 

  // 設定 selection 的值
  setItem(){  
    this.selection = {
      distance: this.distanceRange,
    };
  }
  ionChange(){
    if(this.distanceRange>0){
      this.distanceValid=true;
    }else{
      this.distanceValid=false;
    }
  }
  turnpage(){   //換頁到phase2
    this.setItem();
    // 跳轉頁面時透過 navigationExtras 傳遞 selection 資料
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.selection)
      }
    };
    this.nav.navigateRoot(['selecting-phase2'], navigationExtras);
  }
  turnpagetofood() {   //換頁到food頁面
    this.setItem();
    // 跳轉頁面時透過 navigationExtras 傳遞 selection 資料
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.selection)
      }
    };
    this.nav.navigateRoot(['selecting-food1'], navigationExtras);
  }
  // google autocomplete
  UpdateSearchResults(event){
    //this.autocomplete.input = event;
    //this.autocompleteItems = this.selectform.UpdateSearchResults(event);
    
    // get input content
    this.autocomplete.input = event;
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    // choose 'tw' contry & through the input to predict auto-list to autocomplete items
    this.GoogleAutocomplete.getPlacePredictions({ 
      input: this.autocomplete.input ,
      componentRestrictions: {country: 'tw'} },
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }

   SelectSearchResult(item) {
    //this.autocomplete.input, this.lat, this.long, this.placeid = this.selectform.SelectSearchResult(item);

    console.log(item.description);
    // through the address to get the lat/lng
    this.nativeGeocoder.forwardGeocode(item.description, this.options)
    .then((coordinates: NativeGeocoderResult[]) => {
      console.log('The coordinates are latitude=' + coordinates[0].latitude + ' and longitude=' + coordinates[0].longitude)
      this.lat = coordinates[0].latitude;
      this.long = coordinates[0].longitude;  
    })
    .catch((error: any) => console.log(error));  
  
    this.placeid = item.place_id;
    this.ClearAutocomplete();
    this.autocomplete.input = item.description;
 }

  ClearAutocomplete(){
    this.autocompleteItems = []
    this.autocomplete.input = ''
  }
}
