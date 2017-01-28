import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'body',
    template: require('./app.template.pug')()
})
export class AppComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}