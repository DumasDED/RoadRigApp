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

  venueMarkers: any[];
  highlightedVenue: string = "Hover over a marker";

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
    Observable.forkJoin(
      this.service.getCity(city),
      this.service.getCityVenues(city)
    ).subscribe(c => {
      this.viewport.north = c[0].north;
      this.viewport.south = c[0].south;
      this.viewport.east = c[0].east;
      this.viewport.west = c[0].west;
      this.venueMarkers = c[1].filter(v => v.latitude != null && v.longitude != null).slice(0,20)
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

  log(thing: string) {
    console.log(thing);
  }

  showVenueDetails(venue: any) {
    Observable.forkJoin(
      this.service.getVenueEvents(venue.username || venue.id),
      this.service.getVenueBands(venue.username || venue.id)
    ).subscribe(r => {
      this.highlightedVenue = `${venue.name}: ${r[0].length} events, ${r[1].length} bands`;
    })
  }

  resetVenueDetails() {
    this.highlightedVenue = "Hover over a marker";
  }
}