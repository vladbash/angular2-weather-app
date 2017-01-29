import { ICity } from './../city.detail/city.detail.service';
import { StorageCollections } from './../../config/constants';
import { LocalStorageProvider, ILocalStorageQuery } from './../../shared/storage.provider';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Observer } from 'rxjs'

@Injectable()
export class CitiesListService {
    constructor(private _http: Http, private _storage: LocalStorageProvider) { }

    /**
     * @description method for getting cities list
     */
    getCitiesList(): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            this._storage.get(<ILocalStorageQuery>{
                collection: StorageCollections.city
            }).subscribe(list => {
                observer.next(list);
            });
        });
    }

    populateCitiesWeather(): Observable<any> {
        return this._http.get('');
    }

    /**
     * @description method for creating city object
     * @param city is the city object
     */
    addCityToList(city: ICity): Observable<any> {
        return this._storage.post(<ILocalStorageQuery>{
            collection: StorageCollections.city
        }, city);
    }


}