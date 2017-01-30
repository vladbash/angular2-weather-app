import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { UUID } from 'angular2-uuid';
import * as _ from 'lodash';

export interface IStorageProvider {
    /**
     * @description method for get data from storage
     * @param query - query for getting data
     */
    get(query: string | any): Observable<any>;

    /**
     * @description method for create data in collection
     * @param query - query for posting data
     * @param data - posting data
     */
    post(query: string | any, data: any): Observable<any>;

    /**
     * @description method for update data in collection
     * @param query - query for updating data
     * @param data - updating data
     */
    put?(query: string | any, data: any): Observable<any>;

    /**
     * @description method for deleting
     * @param query - query for deleting
     */
    delete?(query: string | any): Observable<any>;
}

export interface ILocalStorageQuery {
    /**
     * @description collection name
     */
    collection: string;

    /**
     * @description field id
     */
    id?: string | number;

    /**
     * @description custom field equal, must be an array or string like 'field=value'
     */
    fieldsEqual?: string | Array<string>;
}

@Injectable()
export class LocalStorageProvider implements IStorageProvider {

    get(query: ILocalStorageQuery): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            let response: any = JSON.parse(localStorage.getItem(query.collection));
            if (_.has(query, 'fieldsEqual')) {
                let subQuery = new Object();
                _.map(query.fieldsEqual, (e: string) => {
                    let splitted = e.split('=');
                    subQuery[splitted[0]] = splitted[1];
                });
                if (_.has(query, 'id')) {
                    subQuery['id'] = query.id;
                }
                observer.next(_.filter(response, subQuery));
            } else
                observer.next(_.has(query, 'id') ? _.find(response, (e: any) => e.id === query.id) : response);
        });
    }

    post(query: ILocalStorageQuery, data: any): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            let response: any = JSON.parse(localStorage.getItem(query.collection)) || [];
            if(!_.has(data, 'id')) data.id = UUID.UUID();
            response.push(data);
            observer.next(localStorage.setItem(query.collection, JSON.stringify(response)));
        });
    }

    put(query: ILocalStorageQuery, data: any): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            let response: any = JSON.parse(localStorage.getItem(query.collection));
            _.map(response, (e: any) => {
                if (e.id === query.id) {
                    e = data;
                    e.id = query.id;
                }
            });
            observer.next(localStorage.setItem(query.collection, JSON.stringify(response)));
        });
    }

    delete(query: ILocalStorageQuery): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            if (_.has(query, 'id')) {
                let response: any = JSON.parse(localStorage.getItem(query.collection));
                _.remove(response, (e: any) => e.id === query.id);
                console.log(response);
                
                observer.next(localStorage.setItem(query.collection, JSON.stringify(response)));
            } else {
                observer.next(localStorage.removeItem(query.collection));
            }
        });
    }
}