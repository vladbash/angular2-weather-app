import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

export interface IStorageProvider {

    /**
     * @description method for get data from storage
     * @param query is query for getting data
     */
    get(query: string): Observable<any>;

    /**
     * @description method for create data in collection
     * @param query is query for posting data
     * @param data is posting data
     */
    post(query: string, data: any): Observable<any>;

    /**
     * @description method for update data in collection
     * @param query is query for updating data
     * @param data is updating data
     */
    put(query: string, data: any): Observable<any>;

    /**
     * @description method for deleting
     * @param query is query for deleting
     */
    delete(query: string): Observable<any>;
}

@Injectable()
export class LocalStorageProvider implements IStorageProvider { }