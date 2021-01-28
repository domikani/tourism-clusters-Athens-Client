import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MapService} from './map.service';
import * as L from 'leaflet';


@Injectable({
  providedIn: 'root'
})
export class ClusterService {

  public clusterData;
  public clusterOverlay;
  public clusterLayer;
  public myLayerOptions;
  public createCustomCircle;


  /*static scaledRadius(val: number): number {
    return Math.sqrt(val / Math.PI);
  }*/


  constructor(private http: HttpClient, private mapService: MapService) {
    this.http.get('http://localhost:3000/posts/clusters').subscribe((res: any) => {
      this.clusterData = res.features;
      this.getClusterData();
    });

  }


  public getClusterData() {
    let myMarker;

    const countNumbers = this.clusterData.map(x => x.properties.frequency);


    this.createCustomCircle = (feature, latlng) => {
      myMarker = L.circle(latlng, { // we use circle marker for the points
        fillColor: '#501e65',  // fill color of the circles
        color: '#501e65',      // border color of the circles
        weight: 2,             // circle line weight in pixels
        fillOpacity: 0.5,    // fill opacity (0-1)
        radius: Math.sqrt((feature.properties.area) / Math.PI)
      });
      return myMarker;

    };


    this.myLayerOptions = {
      pointToLayer: this.createCustomCircle,
    };
    this.clusterLayer = L.geoJSON(this.clusterData, this.myLayerOptions).addTo(this.mapService.map);

    this.clusterOverlay = {
      'Clusters': this.clusterLayer
    };


  };


}




