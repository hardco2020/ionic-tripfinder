import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollcetAttractionPageRoutingModule } from './collcet-attraction-routing.module';

import { CollcetAttractionPage } from './collcet-attraction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollcetAttractionPageRoutingModule
  ],
  declarations: [CollcetAttractionPage]
})
export class CollcetAttractionPageModule {
  change () {
    var x = document.getElementById("image").getAttribute("src");

    if (x=="assets/img/like.png"){

      document.getElementById("image").setAttribute( 'src', 'assets/img/like (1).png' );
    }
    else{
      document.getElementById("image").setAttribute( 'src', 'assets/img/like.png' );

    }
    alert(x);
  }
}
