import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IResponse} from '../Interfaces/IResponse';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public Attractions = true;
  public visible = false;
  public data = [];


  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  @Input()
  public showPlaces() {
    this.http.get<IResponse>(environment.apiUrl + '/posts/attractions').subscribe(response => {
      if (response.success) {
        this.data = response.data;

      }
    });
  }


  onclick() {
    this.Attractions = !this.Attractions;
    this.visible = !this.visible;
    this.showPlaces();
  }


}
