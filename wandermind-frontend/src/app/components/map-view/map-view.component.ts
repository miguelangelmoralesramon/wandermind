import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnChanges {
  @Input() locationData: any;
  
  mapUrl: SafeResourceUrl | null = null;
  currentZoom = 15;
  selectedMapType = 'roadmap';
  
  mapTypes = [
    { label: 'Road', value: 'roadmap' },
    { label: 'Satellite', value: 'satellite' },
    { label: 'Hybrid', value: 'hybrid' },
    { label: 'Terrain', value: 'terrain' }
  ];
  
  constructor(private sanitizer: DomSanitizer) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['locationData'] && this.locationData?.coordinates) {
      this.updateMapUrl();
    }
  }
  
  zoomIn(): void {
    if (this.currentZoom < 21) {
      this.currentZoom++;
      this.updateMapUrl();
    }
  }
  
  zoomOut(): void {
    if (this.currentZoom > 1) {
      this.currentZoom--;
      this.updateMapUrl();
    }
  }
  
  changeMapType(type: string): void {
    this.selectedMapType = type;
    this.updateMapUrl();
  }
  
  private updateMapUrl(): void {
    if (!this.locationData?.coordinates) {
      return;
    }
    
    const { latitude, longitude } = this.locationData.coordinates;
    
    // Using Google Maps Embed API
    // In a production environment, you would use an API key
    const baseUrl = 'https://www.google.com/maps/embed/v1/view';
    const params = new URLSearchParams({
      key: 'YOUR_API_KEY', // Replace with your actual API key
      center: `${latitude},${longitude}`,
      zoom: this.currentZoom.toString(),
      maptype: this.selectedMapType
    });
    
    // For demo purposes, we'll use a static map URL instead
    // This would be replaced with the commented code above in a production environment
    const staticMapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=${this.currentZoom}&output=embed`;
    
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(staticMapUrl);
  }
}