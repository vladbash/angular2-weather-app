import { Injectable } from '@angular/core';
import { TemperatureType } from '../pages/city.detail/city.detail.service';

@Injectable()
export class HelperService {
    /**
     * @description method for converting temperature
     * @param value is object for converting
     * @param from is starting type
     * @param to is returning type
     * @return converted value
     */
    temperatureConverter(value: number, from: TemperatureType = TemperatureType.Kelvin, to: TemperatureType = TemperatureType.Celsius): number {
        if (from === to) throw new TypeError(`You cann't converting similar types!`);
        if (to === TemperatureType.Fahrenheit) {
            return from === TemperatureType.Celsius ? ((value - 32.0) * 5.0 / 9.0) : (((value - 273.15) * 9.0 / 5.0) + 32.0);
        } else if (to === TemperatureType.Kelvin) {
            return from === TemperatureType.Celsius ? (value + 273.15) : ((value + 459.67) * 5.0 / 9.0);
        }
        return from === TemperatureType.Fahrenheit ? (value * 9.0 / 5.0 + 32.0) : (value - 273.15);
    }
}