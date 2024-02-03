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
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HomeComponent,
    AccountPageComponent,
    StarRatingComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, AppMaterialModule, FormsModule],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
