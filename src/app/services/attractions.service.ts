import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class AttractionsService {

  constructor(private http: HttpClient) {
  }

  makeAttractionsMarker(map): void {
    this.http.get('http://localhost:3000/posts/attractions').subscribe((res: any) => {
      const createCustomIcon = (feature, latlng) => {
        const myIcon = L.icon({
          iconUrl: './assets/location-pin.svg',
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
              layer.bindPopup(feature.properties.name).openPopup();
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
        'Top Attractions': attractionsLayer
      };

      const layers = L.control.layers(null, attractionsOverlay, /*{sortLayers: true}*/).addTo(map);
    });
  }


}

