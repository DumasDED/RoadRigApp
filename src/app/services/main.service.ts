import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'

import 'rxjs/add/operator/map'
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

import { City, State } from 'app/models'

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
}