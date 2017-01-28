import { OnInit, Component } from '@angular/core';

@Component({
    selector: 'cities-list',
    template: require('./cities.list.pug')(),
    styles: [require('./cities.list.scss').toString()]
})
export class CitiesListPage implements OnInit {
    constructor() { }

    ngOnInit(): void { 
        console.log(require('./cities.list.scss')());
    }
}