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
    west: -124.39,
    east: -66.94,
    north: 49.38,
    south: 25.82
  }

  cityStateList;

  cityCtrl: FormControl;
  filteredCityStates: Observable<any[]>;

  venueMarkers: any[];
  highlightedVenue: string = "";
  markerIcon = '/assets/test-marker-1.png'

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
      this.venueMarkers = c[1].filter(v => v.latitude != null && v.longitude != null)
                              .slice(0,20)
                              .map(m => {
                                m.icon = '/assets/test-marker-1.png';
                                return m;
                              })
      this.map.triggerResize(true);
      this.highlightedVenue = "Hover over a marker"
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

  showVenueDetails(venue: any, markerIndex: number) {
    this.venueMarkers[markerIndex].icon = '/assets/test-marker-2.png';
    Observable.forkJoin(
      this.service.getVenueEvents(venue.username || venue.id),
      this.service.getVenueBands(venue.username || venue.id)
    ).subscribe(r => {
      this.highlightedVenue = `${venue.name}: ${r[0].length} events, ${r[1].length} bands`;
    })
  }

  resetVenueDetails(markerIndex: number) {
    this.venueMarkers[markerIndex].icon = '/assets/test-marker-1.png';
    this.highlightedVenue = "Hover over a marker";
  }
}