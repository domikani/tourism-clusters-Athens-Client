import {Component, AfterViewInit} from '@angular/core';
import {MapService} from '../services/map.service';

import {AttractionsService} from '../services/attractions.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  public map;

  constructor(private attractionsService: AttractionsService, private mapService: MapService) {
  }


  ngAfterViewInit() {
    this.mapService.initMap();
    this.attractionsService.makeAttractionsMarker(this.mapService.map);

  }
}


