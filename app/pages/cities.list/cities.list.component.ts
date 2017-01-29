import { CitiesListService } from './cities.list.service';
import { HelperService } from './../../shared/helper.service';
import { OnInit, Component } from '@angular/core';

@Component({
    selector: 'cities-list',
    template: require('./cities.list.pug')(),
    styles: [require('./cities.list.scss').toString()]
})
export class CitiesListPage implements OnInit {
    constructor(private _helperService: HelperService, private _citiesListService: CitiesListService) { }

    ngOnInit(): void {
        this._helperService.getCurrentCity()
            .first()
            .subscribe(() => {
                this._updateCityWeatherList();
            });
    }

    private _updateCityWeatherList(): void {
        this._citiesListService.getCitiesList()
            .subscribe(data => {
                console.log(data);
            });
    }
}