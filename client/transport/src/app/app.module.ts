import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MapComponent } from './components/map/map.component';
// import { AgmCoreComponent } from '@agm/core';
import { AppMaterialModule } from './material.module';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [AppComponent, MapComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, AppMaterialModule],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
