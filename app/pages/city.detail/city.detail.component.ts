import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'city-detail',
    template: require('./city.detail.pug')(),
    styles: [require('./city.detail.scss').toString()]
})
export class CityDetailPage implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}