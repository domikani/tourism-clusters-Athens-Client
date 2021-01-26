import {Component, AfterViewInit} from '@angular/core';
import {MapService} from '../services/map.service';

import {AttractionsService} from '../services/attractions.service';
import {ClusterService} from '../services/cluster.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  public map;

  constructor(private attractionsService: AttractionsService, private mapService: MapService, private clusterService: ClusterService) {
  }


  ngAfterViewInit() {
    this.mapService.initMap();
    this.attractionsService.makeAttractionsMarker(this.mapService.map);
    this.clusterService.getClusterData(this.mapService.map);

  }

}


