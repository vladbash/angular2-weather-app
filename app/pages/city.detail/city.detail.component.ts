import { ICity, CityDetailService, IWeatherForecast } from './city.detail.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'city-detail',
    template: require('./city.detail.pug')(),
    styles: [require('./city.detail.scss').toString()]
})
export class CityDetailPage implements OnInit, OnDestroy {

    cityId: string;
    city: ICity;

    weatherForecast: IWeatherForecast[];

    private routerDispatcher$: Subscription;

    constructor(private route: ActivatedRoute, private _cityDetailService: CityDetailService) { }

    ngOnInit(): void {
        this.routerDispatcher$ = this.route.params.subscribe(params => {
            this.cityId = params['id'];
            this._cityDetailService.getCityById(this.cityId)
                .subscribe(data => {
                    this.city = <ICity>data;
                    this._cityDetailService.getDetailWeatherForecast(this.city)
                        .subscribe(forecast => {
                            this.weatherForecast = forecast;
                            console.log(this.weatherForecast);
                            
                        });
                });
        });
    }

    ngOnDestroy(): void {
        this.routerDispatcher$.unsubscribe();
    }
}