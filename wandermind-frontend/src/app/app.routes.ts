import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ExploreComponent } from './components/explore/explore.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' } // Redirect to home for any unknown routes
];