import { OnInit, Component, Input } from '@angular/core';

@Component({
    selector: 'city-card',
    template: require('./city.card.pug')(),
    styleUrls: [require('./city.card.scss')()]
})
export class CityCardComponent implements OnInit {

    @Input() city: string;

    constructor() { }

    ngOnInit(): void { }
}