import { ICity } from './../city.detail/city.detail.service';
import { CitiesListService } from './cities.list.service';
import { HelperService } from './../../shared/helper.service';
import { OnInit, Component, NgZone } from '@angular/core';

@Component({
    selector: 'cities-list',
    template: require('./cities.list.pug')(),
    styles: [require('./cities.list.scss').toString()]
})
export class CitiesListPage implements OnInit {

    citiesList: ICity[];

    constructor(private _helperService: HelperService, private _citiesListService: CitiesListService, private _ngZone: NgZone) { }

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
                this._ngZone.run(() => {
                    this.citiesList = <ICity[]>data;
                });
            });
    }

    deleteCity(city: ICity): void {
        this._citiesListService.deleteCity(city)
            .subscribe(data => {
                console.log(data);
                data.subscribe();
                this.updateCityWeatherList();
            });
    }
}