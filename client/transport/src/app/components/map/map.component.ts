import { Component, Output, EventEmitter } from '@angular/core';
import { CONSTANTS } from '../map/map.component.constants';
import { ViewChild } from '@angular/core';
import { MapDirectionsService } from '@angular/google-maps';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  SERVER_URL = CONSTANTS.SERVER_URL;
  center: google.maps.LatLngLiteral = { lat: 45.508888, lng: -73.561668 };
  zoom = 10;
  routes: any;
  selectedRoute: number = 1;
  @Output() selectedDriver: EventEmitter<number> = new EventEmitter<number>();

  markers = [
    {
      position: { lat: 45.524587539102605, lng: -73.59621932005314 },
      index: 1,
    },
    {
      position: { lat: 45.54125574352027, lng: -73.6394554062306 },
      index: 3,
    },
    {
      position: { lat: 45.495580740564016, lng: -73.61142367039466 },
      index: 0,
    },
    {
      position: { lat: 45.48643542519496, lng: -73.63541175180751 },
      index: 2,
    },
  ];

  bornes = [
    { position: { lat: 45.48645283, lng: -73.67541173 } },
    { position: { lat: 45.495180740964016, lng: -73.41162367039466 } },
  ];

  size = new google.maps.Size(50, 50);

  @ViewChild('map') map: any;
  constructor(
    private mapDirectionsService: MapDirectionsService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.httpClient.get(`${this.SERVER_URL}/routes`).subscribe((data: any) => {
      {
        return (this.routes = JSON.parse(data.routes));
      }
    });
  }

  showCoords(event: any) {
    console.log([event.latLng.lat(), event.latLng.lng()]);
  }

  showRoute(route: any) {
    console.log(route);
    this.selectedRoute = route;
    this.selectedDriver.emit(Math.floor(Math.random() * 3));
  }
}
