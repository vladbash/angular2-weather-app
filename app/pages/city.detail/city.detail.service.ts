import { LocalStorageProvider } from './../../shared/storage.provider';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

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

@Injectable()
export class CitiesDetailService {
    constructor(private _http: Http, private _storage: LocalStorageProvider) { }

    getCityDetails(): Observable<any> {
        return this._http.get('');
    }
}