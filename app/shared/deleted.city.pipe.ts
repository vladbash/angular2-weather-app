import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

import { ICity } from './../pages/city.detail/city.detail.service';

@Pipe({
    name: 'deleted'
})
export class DeletedCityPipe implements PipeTransform {

    constructor() {}

    transform(value: ICity[]): ICity[] {
        return _.filter(value, city => !city.deleted);
    } 
}