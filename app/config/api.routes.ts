import { GOOGLE_API_KEY, API_KEY } from './constants';
import * as _ from 'lodash';

export const API_ROUTES = {
    openWeatherMap: _.template(`http://api.openweathermap.org/data/2.5/weather?q=<%=city%>,<%=country%>&appid=${API_KEY}`),
    googleMap: _.template(`https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_API_KEY}&latlng=<%=lat%>,<%=lng%>&sensor=false&language=en&result_type=country|locality`),
    getCountries: 'https://restcountries.eu/rest/v1/all'
}