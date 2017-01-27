import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'city-detail',
    template: require('./city.detail.pug')
})
export class CityDetailPage implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}