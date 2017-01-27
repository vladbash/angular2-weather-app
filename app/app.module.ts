import { AppRouter } from './config/app.router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRouter,
        HttpModule,
    ],
    declarations: [],
    providers: [],
    bootstrap: []
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);