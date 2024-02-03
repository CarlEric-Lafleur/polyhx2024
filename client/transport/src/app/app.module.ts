import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MapComponent } from './components/map/map.component';
import { TestComponent } from './pages/test/test.component';
import { GoogleMapsModule } from '@angular/google-maps';
@NgModule({
  declarations: [AppComponent, MapComponent, TestComponent],
  imports: [BrowserModule, AppRoutingModule, GoogleMapsModule],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
