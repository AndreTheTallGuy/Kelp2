import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AquariumsComponent } from './components/aquariums/aquariums.component';

import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';



const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'sign-in', component: SignInComponent},
  { path: 'sign-up', component: SignUpComponent},
  {path: 'aquariums', component: AquariumsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
