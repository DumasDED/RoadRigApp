import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AgmMap } from '@agm/core';

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

  @ViewChild(AgmMap) map: AgmMap;

  viewport = {
    west: -112.101512,
    east: -111.7394581,
    north: 40.8529699,
    south: 40.700246
  }

  cityStateList;

  cityCtrl: FormControl;
  filteredCityStates: Observable<any[]>;

  constructor(private service: MainService) {
    this.cityCtrl = new FormControl();
  }

  filterCities(name: string) {
    return this.cityStateList.filter(cityState => {
      return cityState.toLowerCase().indexOf(name.toLowerCase()) === 0;
    });
  }

  setViewport() {
    var city = this.cityCtrl.value.split(',')[0];
    this.service.getCity(city).subscribe(c => {
      this.viewport.north = c.north;
      this.viewport.south = c.south;
      this.viewport.east = c.east;
      this.viewport.west = c.west;
      this.map.triggerResize(true);
    })
  }

  ngOnInit() {
    this.service.getCitiesList().subscribe(t => {
      this.cityStateList = t.map(r => r.city.name + ', ' + r.state.abbr);
      this.filteredCityStates = this.cityCtrl.valueChanges.pipe(
        startWith(''),
        map((city: string) => city ? this.filterCities(city) : this.cityStateList.slice())
      )
    })
  }
}