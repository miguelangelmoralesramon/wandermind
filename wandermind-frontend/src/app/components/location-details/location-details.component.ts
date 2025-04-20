import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent {
  @Input() locationData: any;
  
  shareLocation(): void {
    if (!this.locationData) {
      return;
    }
    
    // Create share data
    const shareData = {
      title: `WanderMind: ${this.locationData.name}`,
      text: `Check out ${this.locationData.name}: ${this.locationData.description}`,
      url: window.location.href
    };
    
    // Check if Web Share API is available
    if (navigator.share) {
      navigator.share(shareData)
        .catch(error => console.error('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support Web Share API
      this.copyToClipboard(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
      alert('Share info copied to clipboard!');
    }
  }
  
  private copyToClipboard(text: string): void {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}