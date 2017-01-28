import { AppComponent } from './../app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CityDetailPage } from './../pages/city.detail/city.detail.component';
import { CitiesListPage } from './../pages/cities.list/cities.list.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'cities',
        pathMatch: 'full'
    },
    {
        path: 'cities',
        component: CitiesListPage
    },
    {
        path: 'city/:id',
        component: CityDetailPage
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRouter { }