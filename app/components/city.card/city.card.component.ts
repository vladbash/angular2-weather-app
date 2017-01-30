import { OnInit, Component, Input, Output, AfterViewInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from './../../shared/helper.service';
import { CitiesListService } from './../../pages/cities.list/cities.list.service';
import { ICity, CityDetailService, IWeather } from './../../pages/city.detail/city.detail.service';


@Component({
    selector: 'city-card',
    template: require('./city.card.pug')(),
    styles: [String(require('./city.card.scss'))]
})
export class CityCardComponent implements OnInit, AfterViewInit {

    @Input() city: ICity;

    @Output() updateEvent: EventEmitter<any> = new EventEmitter<any>();

    cityWeather: IWeather;

    countriesList: any;

    newCityEntitie: ICity;

    constructor(private _helperService: HelperService, private _citiesListService: CitiesListService, private _cityDetail: CityDetailService) { }

    ngOnInit(): void {
        this.newCityEntitie = <ICity>{
            country: '',
            city: ''
        };
        this.cityWeather = <IWeather>{};
        if (this.city) {
            this._cityDetail.getWeather(this.city)
                .subscribe(data => {
                    this.cityWeather = data;
                });
        }
    }

    ngAfterViewInit(): void {

    }

    search(event: any): void {
        this._helperService.getCountriesList(event.query)
            .subscribe(data => {
                this.countriesList = data;
            });
    }

    addCity(): void {
        let newCity = JSON.parse(JSON.stringify(this.newCityEntitie));
        newCity.country = <any>newCity.country.alpha2Code;
        this._citiesListService.addCityToList(newCity)
            .subscribe(data => {
                debugger
            })
    }

}