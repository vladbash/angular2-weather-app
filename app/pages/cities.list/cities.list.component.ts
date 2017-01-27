import { OnInit, Component } from '@angular/core';

@Component({
    selector: 'cities-list',
    template: require('./cities.list.pug')
})
export class CitiesListPage implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}