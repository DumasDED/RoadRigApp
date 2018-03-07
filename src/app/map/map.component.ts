import { Component, OnInit } from '@angular/core';

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
    'west': -122.4596959,
    'east': -122.2244331,
    'north': 47.734145,
    'south': 47.4919119
  }

  constructor(private service: MainService) { }

  ngOnInit() {
    this.service.getCitiesList();
  }

}