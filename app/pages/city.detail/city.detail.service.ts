import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

export interface ICity {

}

export interface IWeather {
    
}

@Injectable()
export class CitiesDetailService {
    constructor(private _http: Http) { }

    getCityDetails(): Observable<any> {
        return this._http.get('');
    }
}