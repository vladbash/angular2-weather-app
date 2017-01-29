import { AppRouter } from './config/app.router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AutoCompleteModule, InputTextModule, ButtonModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { CityDetailPage } from './pages/city.detail/city.detail.component';
import { CitiesListPage } from './pages/cities.list/cities.list.component';
import { CityCardComponent } from './components/city.card/city.card.component';

import { CitiesDetailService } from './pages/city.detail/city.detail.service';
import { CitiesListService } from './pages/cities.list/cities.list.service';
import { LocalStorageProvider } from './shared/storage.provider';
import { HelperService } from './shared/helper.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRouter,
        HttpModule,
        AutoCompleteModule,
        InputTextModule,
        ButtonModule
    ],
    declarations: [
        AppComponent,
        CitiesListPage,
        CityDetailPage,
        CityCardComponent
    ],
    providers: [
        CitiesListService,
        CitiesDetailService,
        LocalStorageProvider,
        HelperService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);