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

    getCitiesList(): string[] {
        this.http.get(this.apiBaseUrl + 'label/city/nodes')
                 .map(response => response.json())
                 .map(r => Observable.forkJoin(r.map(t => {
                     return this.http.get(t.outgoing_relationships + '/is_in')
                                     .map(t => t.json()[0])
                                     .map(t => t.metadata.id)
                 })))
                 .subscribe(r => {
                     console.log(r);
                 });
        return null;
    }
}