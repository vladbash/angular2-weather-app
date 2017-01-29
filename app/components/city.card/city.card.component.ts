import { Observable } from 'rxjs';
import { HelperService } from './../../shared/helper.service';
import { CitiesListService } from './../../pages/cities.list/cities.list.service';
import { ICity } from './../../pages/city.detail/city.detail.service';
import { OnInit, Component, Input, AfterViewInit } from '@angular/core';

@Component({
    selector: 'city-card',
    template: require('./city.card.pug')(),
    styleUrls: [require('./city.card.scss').toString()]
})
export class CityCardComponent implements OnInit, AfterViewInit {

    @Input() city: ICity;

    countriesList: any;

    newCityEntitie: ICity;

    constructor(private _helperService: HelperService, private _citiesListService: CitiesListService) { }

    ngOnInit(): void {
        this.newCityEntitie = <ICity>{
            country: '',
            city: ''
        };
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