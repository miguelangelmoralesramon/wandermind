import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { VoiceRecorderComponent } from '../voice-recorder/voice-recorder.component';
import { LocationDetailsComponent } from '../location-details/location-details.component';
import { NearbyPlacesComponent } from '../nearby-places/nearby-places.component';
import { MapViewComponent } from '../map-view/map-view.component';
import { GeolocationService } from '../../services/geolocation.service';

// Import Material modules as needed
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    ImageUploadComponent, 
    VoiceRecorderComponent, 
    LocationDetailsComponent,
    NearbyPlacesComponent,
    MapViewComponent,
    // Material modules
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  showUploadSection = false;
  showVoiceSection = false;
  locationDetails: any = null;
  
  constructor(private geolocationService: GeolocationService) {}
  
  showImageUpload(): void {
    this.showUploadSection = true;
    this.showVoiceSection = false;
    this.locationDetails = null;
  }
  
  showVoiceRecorder(): void {
    this.showVoiceSection = true;
    this.showUploadSection = false;
    this.locationDetails = null;
  }
  
  onLocationIdentified(details: any): void {
    this.locationDetails = details;
    
    // If coordinates aren't provided in the response, try to get the user's current location
    if (!this.locationDetails.coordinates) {
      this.geolocationService.getCurrentPosition().subscribe({
        next: (position) => {
          this.locationDetails.coordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
        },
        error: (err) => {
          console.error('Error getting geolocation:', err);
        }
      });
    }
  }
  
  onQueryTranscribed(query: string): void {
    // Here we would call the API service to process the voice query
    // For now, we'll just log it
    console.log('Transcribed query:', query);
    
    // Mock response for demonstration purposes
    setTimeout(() => {
      this.geolocationService.getCurrentPosition().subscribe({
        next: (position) => {
          this.locationDetails = {
            name: 'Current Location',
            description: 'Based on your query: "' + query + '"',
            coordinates: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
            history: 'This is where you are currently located.',
            culturalSignificance: 'Your current surroundings may have local significance.'
          };
        },
        error: (err) => {
          console.error('Error getting geolocation:', err);
          this.locationDetails = {
            name: 'Unknown Location',
            description: 'We could not determine your location.',
            coordinates: null,
            history: 'Please allow location access or upload an image of a landmark.',
            culturalSignificance: ''
          };
        }
      });
    }, 1500);
  }
}