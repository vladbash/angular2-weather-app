import { ICity } from './../city.detail/city.detail.service';
import { CitiesListService } from './cities.list.service';
import { HelperService } from './../../shared/helper.service';
import { OnInit, Component } from '@angular/core';

@Component({
    selector: 'cities-list',
    template: require('./cities.list.pug')(),
    styles: [require('./cities.list.scss').toString()]
})
export class CitiesListPage implements OnInit {

    citiesList: ICity[];

    constructor(private _helperService: HelperService, private _citiesListService: CitiesListService) { }

    ngOnInit(): void {
        this._citiesListService.getCurrentCity()
            .first()
            .subscribe(() => {
                this.updateCityWeatherList();
            });
    }

    updateCityWeatherList(): void {
        this._citiesListService.getCitiesList()
            .subscribe(data => {
                this.citiesList = <ICity[]>data;
            });
    }
}