import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IResponse} from '../Interfaces/IResponse';
import {AttractionsService} from '../services/attractions.service';
import {MapService} from '../services/map.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public toggleGlyphicon;
  public visible = false;
  public dataAttractions = [];
  public paragraph = false;

  constructor(private http: HttpClient, private attractionsService: AttractionsService, private mapService: MapService) {
  }

  ngOnInit() {
  }

  public showPlaces() {
    this.http.get<IResponse>(environment.apiUrl + '/posts/attractions').subscribe(response => {
      if (response.success) {
        this.dataAttractions = response.features;
      }
    });
  }


  onclick() {
    this.visible = !this.visible;
    this.toggleGlyphicon = !this.toggleGlyphicon;
    this.showPlaces();
  }

  clickParagraph(){
    this.paragraph = !this.paragraph;
  }

  addGlyphiconClasses() {
    if (this.toggleGlyphicon) {
      return 'glyphicon glyphicon-eye-close';
    } else {
      return 'glyphicon glyphicon-eye-open';
    }
  }

  zoom(event: Event) {
    this.http.get<IResponse>(environment.apiUrl + '/posts/attractions').subscribe(response => {
      if (response.success) {
        this.dataAttractions = response.features;
        const map = this.mapService.map;
        for (const att in this.dataAttractions) {
          if ((event.target as HTMLInputElement).innerText === this.dataAttractions[att].properties.name) {
            map.flyTo([this.dataAttractions[att].geometry.coordinates[1], this.dataAttractions[att].geometry.coordinates[0]], 18);
          }
        }

      }
    });

  }


}
