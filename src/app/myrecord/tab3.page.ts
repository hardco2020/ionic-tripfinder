import { Component, OnInit ,NgZone ,ViewChild, AfterContentInit} from '@angular/core';
import { DbService } from '../services/db.service';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page  implements OnInit {

  alldata: any[] = [];
  api_key = 'AIzaSyCMjg0lGC43K_RsV687kghZ5qTAbPnQAMo';
  alldata_old = [{      //所有的data
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
     },
     {
       "Aid": 4,
                         "Aname": "快樂100",
                         "photo": "CmRZAAAA-fsbesBp772W6uhAJv9KHpHRzCJS2Zyc0DpWceXW0Wi_dUc7EwK7Ozcx7FzaE90wuNKoyMTrXW6a8c_Yx7kBs5oDKnG0vH0siWwKbxO45FBJKYQZcUHizAyKf_xIKR7dEhDMFLF-WuXuex-cB6-YAe2iGhTT7dyrqvN_b1Y0c7ujEV4GV4O4_Q",
                         "GoogleClass": "amusement_park",
                         "Phone": "07 970 3366",
                         "Address": "806台灣高雄市前鎮區中華五路789號",
                         "Rate": 3.8
     }
     ]

  constructor(
    private sqliteDB: DbService,
    private nav : NavController
  ) {}

  ngOnInit(): void{ //sqliteDB DBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDBDB
    var sql_text = "SELECT * FROM AttractionInfo WHERE favorite = 'y'";
    
    this.sqliteDB.getAttractionsbycondition(sql_text).then(res => {
      this.alldata = res
    })

    console.log(this.alldata);
    
  }
  // back(name){
  //   this.nav.navigateRoot(['outcome',name]);
  //   location.reload();
   
  // }

}
