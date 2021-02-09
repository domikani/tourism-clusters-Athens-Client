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
  public legend;


  constructor(private http: HttpClient, private mapService: MapService) {

    this.http.get('http://localhost:3000/posts/clusters').subscribe((res: any) => {

      this.clusterData = res.features;
      this.getClusterData();

    });

  }


  public getClusterData() {
    let clusterCircles;
    const graduateColors = (photosFrequency) => {
      if (photosFrequency <= 694) {
        return '#FFFF73';
      } else if (photosFrequency > 694 && photosFrequency <= 1345) {
        return '#F5B800';
      } else if (photosFrequency > 1345 && photosFrequency <= 2475) {
        return '#F57A00';
      } else if (photosFrequency > 2475 && photosFrequency <= 4006) {
        return '#F53D00';
      } else if (photosFrequency > 4006) {
        return '#A80000';
      }


    };


    this.createCustomCircle = (feature, latlng) => {
      clusterCircles = L.circle(latlng, { // we use circle marker for the points
        fillColor: graduateColors(feature.properties.frequency),  // fill color of the circles
        weight: 1,
        color: 'gray',
        fillOpacity: 0.7,
        /*dashArray: '5',*/
        radius: Math.sqrt((feature.properties.area) / Math.PI),
      });
      return clusterCircles;

    };

    this.zoomToFeature = (event) => {
      this.mapService.map.fitBounds(event.target.getBounds());
    };

    this.onEachFeature = (feature, layer) => {
      if (feature.properties && feature.properties.frequency) {
        layer.on({
          click: (event) => {
            layer.bindPopup(`<h4>Area Of Interest: "${feature.properties.aoi}"</h4><h5>Cluster Id:<strong> ${feature.properties.cluster_id}</strong></h5><h5>Geotagged photos: <strong>${feature.properties.frequency}</strong></h5><button class='btn btn-info center-block' id=${feature.properties.cluster_id}>Show statistics</button>`).openPopup();
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

    // @ts-ignore
    this.legend = L.control({position: 'bottomright'});
    this.legend.onAdd = function() {
      let div = L.DomUtil.create('div', 'info legend'),
        grades = [694, 1345, 2475, 4006, 10778];
      div.innerHTML = `<h3 class="legend-header">Geotagged photos frequency<br>per Area Of Interest<br> (2009-2019)</h3>`;
      for (let i = 0; i < grades.length; i++) {
        if (grades[i] <= 694) {
          div.innerHTML += `<i style=background:#FFFF73 ></i>480 - ${grades[i]}<br>`;
        } else if (grades[i] > 694 && grades[i] <= 1345) {
          div.innerHTML += `<i style=background:#F5B800 ></i>${grades[i - 1] + 1} - ${grades[i]} <br>`;
          console.log(`${grades[i - 1] + 1} - ${grades[i]}`);
        } else if (grades[i] > 1345 && grades[i] <= 2475) {
          div.innerHTML += `<i style=background:#F57A00 ></i>${grades[i - 1] + 1} - ${grades[i]} <br>`;
        } else if (grades[i] > 2475 && grades[i] <= 4006) {
          div.innerHTML += `<i style=background:#F53D00 ></i>${grades[i - 1] + 1} - ${grades[i]} <br>`;
        } else if (grades[i] > 4006) {
          div.innerHTML += `<i style=background:#A80000 ></i>${grades[i - 1] + 1} - ${grades[i]}`;
        }
      }
      div.innerHTML += `<hr><img src='./assets/pin.svg' width="20px" height="20px" alt="pin-image"> Top Attractions<br>`;

      return div;
    };

    this.legend.addTo(this.mapService.map);


  }


}




