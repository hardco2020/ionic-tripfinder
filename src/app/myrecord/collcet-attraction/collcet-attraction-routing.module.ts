import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollcetAttractionPage } from './collcet-attraction.page';

const routes: Routes = [
  {
    path: '',
    component: CollcetAttractionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollcetAttractionPageRoutingModule {
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

  secound(obj){
      obj.name="ios-heart-outline";
      console.log(obj.getAttribute("name"));
  }

  first(obj){
      obj.name="heart";
      console.log(obj.getAttribute("name"));
  }
}
