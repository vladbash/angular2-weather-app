import { GOOGLE_API_KEY } from './constants';
import * as _ from 'lodash';

export const API_ROUTES = {
    host: 'http://api.openweathermap.org/data/2.5/weather',
    googleMap: _.template(`https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_API_KEY}&latlng=<%=lat%>,<%=lng%>&sensor=false&language=en&result_type=country|locality`)
}