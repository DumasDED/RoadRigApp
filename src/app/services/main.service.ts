import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'

import 'rxjs/add/operator/map'
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

import { City, State, Viewport } from 'app/models'

@Injectable()
export class MainService {
    private apiBaseUrl = environment.apiBaseUrl
    private cities;

    constructor (private http: Http) { }

    getCitiesList() {
        return this.http.get(this.apiBaseUrl + 'cityStateList')
                 .map(response => response.json());
    }

    getCity(cityName: string): Observable<City> {
        return this.http.get(this.apiBaseUrl + `cities/${cityName}`)
                        .map(r => r.json() as City)
    }

    getCityVenues(cityName: string): Observable<any[]> {
        return this.http.get(this.apiBaseUrl + `cities/${cityName}/venues`)
                        .map(r => r.json())
    }

    getViewportVenues(viewport: Viewport): Observable<any[]> {
        return this.http.get(this.apiBaseUrl +
            `viewport/venues?south=${viewport.south}&north=${viewport.north}&west=${viewport.west}&east=${viewport.east}`)
                        .map(r => r.json())
    }

    getVenueEvents(venueUsername: string): Observable<any[]> {
        return this.http.get(this.apiBaseUrl + `venues/${venueUsername}/events`)
                        .map(r => r.json())
    }

    getVenueBands(venueUsername: string): Observable<any[]> {
        return this.http.get(this.apiBaseUrl + `venues/${venueUsername}/bands`)
                        .map(r => r.json())
    }
}