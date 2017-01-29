import { Http } from '@angular/http';
import { Observable, Observer } from 'rxjs';
import { Injectable } from '@angular/core';

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
     * @param value is object for converting
     * @param from is starting type
     * @param to is returning type
     * @return converted value
     */
    temperatureConverter(value: number, from: TemperatureType = TemperatureType.Kelvin, to: TemperatureType = TemperatureType.Celsius): number {
        if (from === to) throw new TypeError(`You cann't converting similar types!`);
        if (to === TemperatureType.Fahrenheit) {
            return from === TemperatureType.Celsius ? ((value - 32.0) * 5.0 / 9.0) : (((value - 273.15) * 9.0 / 5.0) + 32.0);
        } else if (to === TemperatureType.Kelvin) {
            return from === TemperatureType.Celsius ? (value + 273.15) : ((value + 459.67) * 5.0 / 9.0);
        }
        return from === TemperatureType.Fahrenheit ? (value * 9.0 / 5.0 + 32.0) : (value - 273.15);
    }

    /**
     * @description get city info by coordinates
     * @param lat is city geo location, latitude
     * @param lng is city geo location, longitude
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
     * @description method for checking and getting current city
     */
    getCurrentCity(): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            navigator.geolocation.getCurrentPosition(result => {
                this.getCityByCoordinates(result.coords.latitude, result.coords.longitude)
                    .subscribe(response => {
                        this._localStorageProvider.get(<ILocalStorageQuery>{
                            collection: StorageCollections.city,
                            fieldsEqual: [`name=${response.name}`, `country=${response.country}`]
                        }).subscribe(data => {
                            if (!data || data.length === 0) {
                                this._localStorageProvider.post(<ILocalStorageQuery>{
                                    collection: StorageCollections.city
                                }, response).subscribe(postResponse => {
                                    observer.next(response);
                                })
                            } else {
                                observer.next(response);
                            }
                        });
                    });
            });
        });
    }
}