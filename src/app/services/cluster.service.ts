import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as L from 'leaflet';


@Injectable({
  providedIn: 'root'
})
export class ClusterService {

  clusterData;


  /*static scaledRadius(val: number): number {
    return Math.sqrt(val / Math.PI);
  }*/


  constructor(private http: HttpClient) {

  }

  getClusterData = (map) => {
    let myMarker;
    this.http.get('http://localhost:3000/posts/clusters').subscribe((res: any) => {
      this.clusterData = res.features;
      const countNumbers = this.clusterData.map(x => x.properties.frequency);


      const createCustomCircle = (feature, latlng) => {
        myMarker = L.circle(latlng, { // we use circle marker for the points
          fillColor: '#501e65',  // fill color of the circles
          color: '#501e65',      // border color of the circles
          weight: 2,             // circle line weight in pixels
          fillOpacity: 0.5,    // fill opacity (0-1)
          radius: Math.sqrt((feature.properties.frequency / Math.PI))
        })
        ;
        return myMarker;

      };


      const myLayerOptions = {
        pointToLayer: createCustomCircle,
      };
      const clusterLayer = L.geoJSON(this.clusterData, myLayerOptions).addTo(map);


    });


  };

}



