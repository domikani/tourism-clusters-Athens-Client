import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MapService} from './map.service';
import {ClusterService} from './cluster.service';
import {environment} from '../../environments/environment';
import {IResponse} from '../Interfaces/IResponse';

import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class AttractionsService {


  constructor(private http: HttpClient, private mapService: MapService, private clusterService: ClusterService) {


  }


  makeAttractionsMarker(map): void {

    this.http.get<IResponse>(environment.apiUrl + '/posts/attractions').subscribe((res: any) => {
      const createCustomIcon = (feature, latlng) => {
        const myIcon = L.icon({
          iconUrl: './assets/pin.svg',
          iconSize: [35, 35],
          shadowSize: [35, 20],
          iconAnchor: [12, 12],
          shadowAnchor: [12, 6],
          popupAnchor: [0, 0]
        });

        return L.marker(latlng, {icon: myIcon});
      };

      const onEachFeature = (feature, layer) => {
        if (feature.properties && feature.properties.name) {
          // tslint:disable-next-line:only-arrow-functions
          layer.on({
            mouseover: () => {
              layer.bindPopup(
                `<h4 class="text-center">${feature.properties.name}</h4><img class="img-responsive center-block" src="${feature.properties.img}"  alt="image">`
              ).openPopup();
            },
            mouseout: () => {
              layer.closePopup();
            }
          });
        }
      };
      const myLayerOptions = {
        pointToLayer: createCustomIcon,
        onEachFeature
      };
      const attractionsLayer = L.geoJSON(res, myLayerOptions).addTo(map);
      const attractionsOverlay = {
        'Top Attractions': attractionsLayer,
        'Clusters': this.clusterService.clusterLayer
      };

      const layers = L.control.layers(this.mapService.baseMaps, attractionsOverlay).addTo(map);


    });
  }


}

