import { Component } from '@angular/core';
// import { CONSTANTS } from '../map/map.component.constants';
import { ViewChild } from '@angular/core';
import { MapDirectionsService } from '@angular/google-maps';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  //   URL = CONSTANTS.URL;
  center: google.maps.LatLngLiteral = { lat: 45.508888, lng: -73.561668 };
  zoom = 10;
  routes: any;
  @ViewChild('map') map: any;
  constructor(mapDirectionsService: MapDirectionsService) {
    this.routes = fetch('http://127.0.0.1:5000/routes').then((res) =>
      res.json()
    );
  }

  showCoords(event: any) {
    console.log(this.routes);
  }
}
