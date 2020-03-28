import { Component, OnInit } from '@angular/core';

import { SelectionPh1 } from '../selecting-phase1/selection-ph1';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-selecting-phase2',
  templateUrl: './selecting-phase2.page.html',
  styleUrls: ['./selecting-phase2.page.scss'],
})
export class SelectingPhase2Page implements OnInit {
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
