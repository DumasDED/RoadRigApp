import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import { MainService } from 'app/services/main.service';
import { City, State } from 'app/models';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  lat: number = 40.6782;
  lng: number = -73.9442;

  viewport = {
    west: -112.101512,
    east: -111.7394581,
    north: 40.8529699,
    south: 40.700246
  }

  cityStateList;

  constructor(private service: MainService) { }

  ngOnInit() {
    this.service.getCitiesList().subscribe(t => {
      this.cityStateList = t.map(r => r.city.name + ', ' + r.state.abbr);
      console.log(t);
    })
  }

}