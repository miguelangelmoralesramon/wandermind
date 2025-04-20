import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="explore-container">
      <h1>Explore Nearby Landmarks</h1>
      <p class="coming-soon">This feature is coming soon. Stay tuned!</p>
      
      <div class="placeholder-image">🏙️</div>
      
      <p class="description">
        The Explore feature will allow you to discover landmarks and attractions 
        near your current location without having to upload a photo or record a voice message.
      </p>
      
      <button class="return-home" routerLink="/">Return to Home</button>
    </div>
  `,
  styles: [`
    .explore-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }
    
    h1 {
      font-size: 2.5rem;
      color: #1a73e8;
      margin-bottom: 1rem;
    }
    
    .coming-soon {
      font-size: 1.5rem;
      color: #34a853;
      font-weight: 500;
      margin-bottom: 2rem;
    }
    
    .placeholder-image {
      font-size: 5rem;
      margin: 2rem 0;
    }
    
    .description {
      font-size: 1.1rem;
      color: #555;
      max-width: 600px;
      margin: 0 auto 2rem;
      line-height: 1.6;
    }
    
    .return-home {
      background-color: #1a73e8;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 30px;
      font-weight: 500;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        background-color: #1665d8;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      }
    }
  `]
})
export class ExploreComponent {
  // This is a placeholder component for future development
}