import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectFormService {
   // 表單資料初始化
   items =[{
    'title':'距離範圍(以內)',
    'model':'distance',
    'options': [{
      'value': 2,
      'text': '2 公里'
    },{
      'value': 5,
      'text': '5 公里'
    },{
      'value': 10,
      'text': '10 公里'
    },{
      'value': 20,
      'text': '20 公里'
    }]
  },{
    'title':'交通工具',
    'model':'transportion',
    'options': [{
      'value': 'walk',
      'text': '走路'
    },{
      'value': 'bike',
      'text': '腳踏車'
    },{
      'value': 'car',
      'text': '開車'
    },{
      'value': 'mortocycle',
      'text': '機車'
    }]
  },{
    'title':'時段',
    'model':'period',
    'options': [{
      'value': 'morning',
      'text': '早上'
    },{
      'value': 'afternoon',
      'text': '下午'
    },{
      'value': 'night',
      'text': '傍晚'
    }]
  },{
    'title':'消費金額',
    'model':'amount',
    'options': [{
      'value': 0,
      'text': 'free',
    },{
      'value': 500,
      'text': '0 - 500 元'
    },{
      'value': 2000,
      'text': '500 - 2000 元'
    },{
      'value': 10000,
      'text': '10000 以上'
    }]
  }
  ];
  constructor() { }

  getSelectForm(){
    return this.items;
  }
}
