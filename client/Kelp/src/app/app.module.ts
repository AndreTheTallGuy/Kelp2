import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

//Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'

// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from '../environments/environment';

// tutorial components
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

//auth service
import { ApiService } from "./services/api.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { AquariumsComponent } from './components/aquariums/aquariums.component';
import { AddAquariumComponent } from './components/add-aquarium/add-aquarium.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AquariumPanelComponent } from './components/aquarium-panel/aquarium-panel.component';
import { AquariumPageComponent } from './components/aquarium-page/aquarium-page.component'
import { TransferService } from './services/transfer.service';
import { ReviewPanelComponent } from './components/review-panel/review-panel.component';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
 

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    AquariumsComponent,
    AddAquariumComponent,
    DashboardComponent,
    SearchBarComponent,
    AquariumPanelComponent,
    AquariumPageComponent,
    ReviewPanelComponent,
    AddReviewComponent,
    
  ],
  exports: [
    MatInputModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'Kelp2'),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatInputModule,
    
  ],
  providers: [ApiService, TransferService, {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}],
  bootstrap: [AppComponent]
})
export class AppModule { }
