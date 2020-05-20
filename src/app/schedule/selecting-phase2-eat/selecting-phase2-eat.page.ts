import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-selecting-phase2-eat',
  templateUrl: './selecting-phase2-eat.page.html',
  styleUrls: ['./selecting-phase2-eat.page.scss'],
})
export class SelectingPhase2EatPage implements OnInit {

  constructor() { }

    labels = [
    {
      key: 1,
      name:'outdoor',
      title: '餐廳',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 2,
      name:'indoor',
      title: '小吃攤',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 3,
      name:'dynamic',
      title: '平價',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 4,
      name:'static',
      title: '素食',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 5,
      name:'netbeauty',
      title: '餐酒館',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 6,
      name:'hipster',
      title: '中式',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 7,
      name:'near_mountain',
      title: '異國料理',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 8,
      name:'near_sea',
      title: '日式',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 9,
      name:'shopping',
      title: '夜市',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 10,
      name:'exhibition',
      title: '當地特色',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 11,
      name:'historic_site',
      title: '素食',
      img: 'http://via.placeholder.com/300x300'
    },
    {
      key: 12,
      name:'night_view',
      title: '甜點',
      img: 'http://via.placeholder.com/300x300'
    }
  ];

  ngOnInit() {
  }
}
