import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  // This component is mostly static content, so we don't need much logic here
  
  subscribeToNewsletter(email: string): void {
    // In a real application, this would connect to a service to handle newsletter subscriptions
    console.log('Subscribing email to newsletter:', email);
    alert('Thank you for subscribing to our newsletter!');
  }
}