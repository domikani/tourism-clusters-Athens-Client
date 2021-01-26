import {Injectable} from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public map;

  constructor() {

  }

  public initMap() {

    this.map = L.map('map', {
      center: [37.9643696, 23.7489174],
      zoom: 11,
      zoomControl: false,
    });

    const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap' +
        '</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    });
    tiles.addTo(this.map);

    // custom control zoom
    const ctrlZoom = L.control.zoom({
      zoomInText: 'In',
      zoomOutText: 'Out',
      position: 'topright'
    }).addTo(this.map);

    // Overlays

    /*const ctrlLayers = L.control.layers(overlays).addTo(this.map);*/


  }
}
