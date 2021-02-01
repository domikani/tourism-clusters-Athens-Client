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
  public onEachFeature;
  public zoomToFeature;
  public myValue;


  constructor(private http: HttpClient, private mapService: MapService) {

    this.http.get('http://localhost:3000/posts/clusters').subscribe((res: any) => {

      this.clusterData = res.features;
      this.getClusterData();

    });

  }


  public getClusterData() {
    let clusterCircles;
    const graduateColors = (photosFrequency) => {
      return photosFrequency >= 10778 ? '#A80000' :
        photosFrequency >= 4006 ? '#F53D00' :
          photosFrequency >= 2475 ? '#F57A00' :
            photosFrequency >= 1345 ? '#F5B800' : '#FFFF73';

    };


    this.createCustomCircle = (feature, latlng) => {
      clusterCircles = L.circle(latlng, { // we use circle marker for the points
        fillColor: graduateColors(feature.properties.frequency),  // fill color of the circles
        weight: 1,
        color: 'gray',
        fillOpacity: 0.6,
        /*dashArray: '5',*/
        radius: Math.sqrt((feature.properties.area) / Math.PI),
      })
      ;
      return clusterCircles;

    };

    this.zoomToFeature = (event, what) => {
      this.mapService.map.fitBounds(event.target.getBounds());
    };

    this.onEachFeature = (feature, layer) => {
      if (feature.properties && feature.properties.frequency) {
        layer.on({
          click: (event) => {
            layer.bindPopup(`<btn class='btn btn-primary' id=${feature.properties.cluster_id}>Show statistics</btn>`).openPopup();
            this.mapService.map.fitBounds(event.target.getBounds());
          },
        });
      } else {
        return 'error';
      }

    };


    this.myLayerOptions = {
      pointToLayer: this.createCustomCircle,
      onEachFeature: this.onEachFeature
    };
    this.clusterLayer = L.geoJSON(this.clusterData, this.myLayerOptions).addTo(this.mapService.map);

    this.clusterOverlay = {
      'Clusters': this.clusterLayer
    };


  };


}




