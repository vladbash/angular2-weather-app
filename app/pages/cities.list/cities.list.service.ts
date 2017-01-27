import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CitiesListService {
    constructor(private _http: Http) {}
}