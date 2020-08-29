import { Injectable } from '@angular/core';
import { NgZone } from '@angular/core';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

declare var google;
@Injectable({
  providedIn: 'root'
})
export class SelectFormService {

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

  constructor(
    private nativeGeocoder: NativeGeocoder,     // latlan <-> address change
    public zone: NgZone,
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }
  UpdateSearchResults(event){
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

    return this.autocompleteItems;
  }
   // when click one of autocompleteitem
   SelectSearchResult(item) {
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

    return item.description, this.lat, this.long, this.placeid;
  }
  
  // clean ionsearchbar
  ClearAutocomplete(){
    this.autocompleteItems = []
    this.autocomplete.input = ''
  }
}
