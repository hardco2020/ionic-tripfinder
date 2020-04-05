import { Component, OnInit } from '@angular/core';

import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-outcome',
  templateUrl: './outcome.page.html',
  styleUrls: ['./outcome.page.scss'],
})
export class OutcomePage implements OnInit {

   // 透過 url 將 selection 傳遞到此頁面
   data: any;
   constructor(private route: ActivatedRoute, private router: Router) { 
     this.route.queryParams.subscribe(param=>{
       if(param && param.special){
         this.data = JSON.parse(param.special);
       }
     });
   }
  ngOnInit() {
    console.log(this.data);
  }

}
