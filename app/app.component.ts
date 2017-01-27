import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app',
    template: require('./app.template.pug')
})
export class AppComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}