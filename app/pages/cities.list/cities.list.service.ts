import { LocalStorageProvider } from './../../shared/storage.provider';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Observer } from 'rxjs'

@Injectable()
export class CitiesListService {
    constructor(private _http: Http, private _storage: LocalStorageProvider) { }

    getCitiesList(): Observable<any> {
        return Observable.create((observer: Observer<any>) => { });
    }

    populateCitiesWeather(): Observable<any> {
        return this._http.get('');
    }

    addCityToList(param: any): Observable<any> {
        return this._http.get('');
    }
}