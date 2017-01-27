import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CitiesDetailService {
    constructor(private _http: Http) {}
}