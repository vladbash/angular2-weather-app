import { HelperService } from './../../shared/helper.service';
import { API_ROUTES } from './../../config/api.routes';
import { LocalStorageProvider, ILocalStorageQuery } from './../../shared/storage.provider';
import { StorageCollections } from './../../config/constants';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Observer } from 'rxjs';
import * as translit from 'transliterate';
import * as _ from 'lodash';
import * as moment from 'moment';

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
    constructor(private _http: Http, private _storage: LocalStorageProvider, private _helperService: HelperService) { }

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
                        icon: data.weather[0].icon || '',
                        description: data.weather[0].description || '',
                        temperature: this._helperService.temperatureConverter(data.main.temp || 0, TemperatureType.Kelvin, TemperatureType.Celsius),
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
                                    icon: e.weather[0].icon || '',
                                    temperature: this._helperService.temperatureConverter(e.main.temp || 0, TemperatureType.Kelvin, TemperatureType.Celsius),
                                    humidity: e.main.humidity || 0,
                                    temp_max: this._helperService.temperatureConverter(e.main.temp_max || 0, TemperatureType.Kelvin, TemperatureType.Celsius),
                                    temp_min: this._helperService.temperatureConverter(e.main.temp_min || 0, TemperatureType.Kelvin, TemperatureType.Celsius),
                                    pressure: e.main.pressure || 0
                                }
                            };
                        })
                        .value()
                    );
                });
        });
    }

    /**
     * @description method for getting detail weather for today
     * @param city - valid city object
     */
    getDetailWeatherForecastPerDay(city: ICity): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            this.getDetailWeatherForecast(city)
                .subscribe(data => {
                    observer.next(_.chain(data)
                        .take(6)
                        .value());
                });
        });
    }
}