import {Injectable} from '@angular/core';

import * as L from 'leaflet';


@Injectable({
  providedIn: 'root'
})
export class MapService {
  public map;
  public ctrlZoom;
  public cartoDBlayer;
  public imageryLayer;
  public cartoDBdarkLayer;
  public baseMaps;
  public test;

  constructor() {

  }

  public initMap() {

    this.map = L.map('map', {
      center: [37.9643696, 23.7489174],
      zoom: 11,
      zoomControl: false,
    });

    this.cartoDBlayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap' +
        '</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    });

    this.imageryLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    this.cartoDBdarkLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    });

    this.map.addLayer(this.cartoDBlayer);

    this.baseMaps = {
      'Voyager': this.cartoDBlayer,
      'Imagery': this.imageryLayer,
      'Dark Matter': this.cartoDBdarkLayer
    };


    // custom control zoom
    this.ctrlZoom = L.control.zoom({
      zoomInText: 'In',
      zoomOutText: 'Out',
      position: 'topright'
    }).addTo(this.map);


    // Overlays

    /*const ctrlLayers = L.control.layers(overlays).addTo(this.map);*/


  }
}
