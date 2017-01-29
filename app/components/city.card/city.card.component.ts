import { HelperService } from './../../shared/helper.service';
import { CitiesListService } from './../../pages/cities.list/cities.list.service';
import { ICity } from './../../pages/city.detail/city.detail.service';
import { OnInit, Component, Input } from '@angular/core';

@Component({
    selector: 'city-card',
    template: require('./city.card.pug')(),
    styleUrls: [require('./city.card.scss')()]
})
export class CityCardComponent implements OnInit {

    @Input() city: ICity;

    constructor(private _helperService: HelperService, private _citiesListService: CitiesListService) { }

    ngOnInit(): void { }
}