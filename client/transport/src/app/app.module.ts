import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MapComponent } from './components/map/map.component';
// import { TestComponent } from './pages/test/test.component';
import { AppMaterialModule } from './material.module';
import { HomeComponent } from './pages/home/home.component';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { PlanningPageComponent } from './pages/planning-page/planning-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FindCompanionPageComponent } from './pages/find-companion-page/find-companion-page.component';
import { RatingPopupComponent } from './components/rating-popup/rating-popup.component';

// import { AuthModule } from '@auth0/auth0-angular';
// import { AuthButtonComponent } from './components/login-button/login-button.component';
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HomeComponent,
    AccountPageComponent,
    StarRatingComponent,
    PlanningPageComponent,
    FindCompanionPageComponent,
    RatingPopupComponent,
    // AuthButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    FormsModule,
    GoogleMapsModule,
    HttpClientModule,
    // AuthModule.forRoot({
    //   domain: 'RpRoNG2jDzOu0Lcc8ShcVTIzYuifiO15',
    //   clientId: 'dev-dws8my8zorm6ql1j.us.auth0.com',
    //   authorizationParams: {
    //     redirect_uri: window.location.origin,
    //   },
    // }),
  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
