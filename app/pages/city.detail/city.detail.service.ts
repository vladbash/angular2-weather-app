import { API_ROUTES } from './../../config/api.routes';
import { LocalStorageProvider, ILocalStorageQuery } from './../../shared/storage.provider';
import { StorageCollections } from './../../config/constants';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Observer } from 'rxjs';
import * as translit from 'transliterate';
import * as _ from 'lodash';

export enum TemperatureType {
    Kelvin, Celsius, Fahrenheit
}

export interface ICity {
    /**
     * @description city Id
     */
    id?: any;

    /**
     * @description city name
     */
    name?: string;

    /**
     * @description country 
     */
    country?: string;

    /**
     * @description city geo location, latitude
     */
    lat?: number;

    /**
     * @description city geo location, longitude
     */
    long?: number;
}

export interface IWeather {
    /**
     * @description it is main status
     */
    main: string;

    /**
     * @description it is weather status description
     */
    description: string;

    /**
     * @description temperature - default is Kelvin
     */
    temperature: number;

    /**
     * @description atmospheric pressure, hPa
     */
    pressure?: number;

    /**
     * @description humidity, %
     */
    humidity?: number;

    /**
     * @description temperature minimum at the moment
     */
    temp_min?: number;

    /**
     * @description temperature maximum at the moment
     */
    temp_max?: number;
}

export interface IWeatherForecast {
    /**
     * @description forecast date
     */
    date: Date | any;

    /**
     * @description date text
     */
    date_text: string;

    /**
     * @description weather forecast
     */
    weather: IWeather;
}

@Injectable()
export class CityDetailService {
    constructor(private _http: Http, private _storage: LocalStorageProvider) { }

    /**
     * @description method for city checking and standartisation
     * @param city - non checked city object
     */
    getCityDetails(city: ICity): Observable<any> {
        return this._http.get(API_ROUTES.openWeatherMap({ city: translit(city.name), country: city.country }))
            .map(response => response.json());
    }

    /**
     * @description method for getting city weather data
     * @param city - valid city object
     */
    getWeather(city: ICity): Observable<IWeather> {
        return Observable.create((observer: Observer<any>) => {
            this.getCityDetails(city)
                .subscribe(data => {
                    observer.next(<IWeather>{
                        main: data.weather[0].main || '',
                        description: data.weather[0].description || '',
                        temperature: data.main.temp || 0,
                        humidity: data.main.humidity || 0,
                        temp_max: data.main.temp_max || 0,
                        temp_min: data.main.temp_min || 0,
                        pressure: data.main.pressure || 0
                    })
                });
        });
    }

    /**
     * @description get city by id
     * @param id - citie's identitie key
     */
    getCityById(id: string): Observable<ICity> {
        return Observable.create((observer: Observer<any>) => {
            this._storage.get(<ILocalStorageQuery>{
                collection: StorageCollections.city,
                id: id
            }).subscribe(data => {
                if (data) observer.next(<ICity>data);
            });
        });
    }

    /**
     * @description get detail city weather forecast
     * @param city - valid city object
     */
    getDetailWeatherForecast(city: ICity): Observable<IWeatherForecast[]> {
        return Observable.create((observer: Observer<any>) => {
            this._http.get(API_ROUTES.openWeatherMapForecast({ city: city.name, country: city.country }))
                .map(response => response.json())
                .subscribe(data => {
                    if (data.cod !== '200') {
                        observer.next(null);
                        return;
                    }
                    observer.next(_.chain(data.list)
                        .map((e: any) => {
                            return <IWeatherForecast>{
                                date: e.dt,
                                date_text: e.dt_txt,
                                weather: <IWeather>{
                                    main: e.weather[0].main || '',
                                    description: e.weather[0].description || '',
                                    temperature: e.main.temp || 0,
                                    humidity: e.main.humidity || 0,
                                    temp_max: e.main.temp_max || 0,
                                    temp_min: e.main.temp_min || 0,
                                    pressure: e.main.pressure || 0
                                }
                            };
                        })
                        .value()
                    );
                });
        });
    }
}