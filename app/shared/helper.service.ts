import { Http } from '@angular/http';
import { Observable, Observer } from 'rxjs';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { TemperatureType } from '../pages/city.detail/city.detail.service';
import { LocalStorageProvider, ILocalStorageQuery } from './storage.provider';
import { API_ROUTES } from './../config/api.routes';
import { ICity } from './../pages/city.detail/city.detail.service';
import { StorageCollections } from './../config/constants';

@Injectable()
export class HelperService {

    constructor(private _http: Http, private _localStorageProvider: LocalStorageProvider) { }

    /**
     * @description method for converting temperature
     * @param value - object for converting
     * @param from - starting type
     * @param to - returning type
     * @return converted value
     */
    temperatureConverter(value: number, from: TemperatureType = TemperatureType.Kelvin, to: TemperatureType = TemperatureType.Celsius): number {
        if (from === to) throw new TypeError(`You cann't converting similar types!`);
        if (to === TemperatureType.Fahrenheit) {
            return _.ceil(from === TemperatureType.Celsius ? ((value - 32.0) * 5.0 / 9.0) : (((value - 273.15) * 9.0 / 5.0) + 32.0), 0);
        } else if (to === TemperatureType.Kelvin) {
            return _.ceil(from === TemperatureType.Celsius ? (value + 273.15) : ((value + 459.67) * 5.0 / 9.0), 0);
        }
        return _.ceil(from === TemperatureType.Fahrenheit ? (value * 9.0 / 5.0 + 32.0) : (value - 273.15), 0);
    }

    /**
     * @description get city info by coordinates
     * @param lat - city geo location, latitude
     * @param lng - city geo location, longitude
     */
    getCityByCoordinates(lat: number, lng: number): Observable<ICity> {
        return Observable.create((observer: Observer<any>) => {
            this._http.get(API_ROUTES.googleMap({ 'lat': lat, 'lng': lng }))
                .map(response => response.json())
                .subscribe(data => {
                    observer.next(<ICity>{
                        name: data.results[0].address_components[0].long_name,
                        country: data.results[data.results.length - 1].address_components[0].long_name,
                        lat: lat,
                        long: lng
                    });
                });
        });
    }

    /**
     * @description method for getting country list
     * @param query - query for search
     */
    getCountriesList(query?: string): Observable<any> {
        return this._http.get(API_ROUTES.getCountries)
            .map(response => response.json())
            .map(response => {
                return _.chain(response)
                    .filter((e: any) => (e.name.toLowerCase().indexOf((query || '').toLowerCase()) !== -1))
                    .map((e: any) => {
                        return {
                            name: e.name,
                            alpha2Code: e.alpha2Code,
                            alpha3Code: e.alpha3Code
                        };
                    }).value();
            });
    }
}