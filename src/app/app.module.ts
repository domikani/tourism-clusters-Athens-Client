import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {MapComponent} from './map/map.component';
import {HttpClientModule} from '@angular/common/http';
import {AttractionsService} from './services/attractions.service';
import {StatisticsComponent} from './statistics/statistics.component';
import {ChartsModule, ThemeService} from 'ng2-charts';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MapComponent,
    StatisticsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
  ],
  providers: [
    AttractionsService, ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
