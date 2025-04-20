import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

interface Place {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  category: string;
  distance: number;
  image: string;
  mapUrl: string;
  openingHours?: string;
  website?: string;
}

@Component({
  selector: 'app-nearby-places',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nearby-places.component.html',
  styleUrls: ['./nearby-places.component.scss']
})
export class NearbyPlacesComponent implements OnInit, OnChanges {
  @Input() locationCoordinates: { latitude: number; longitude: number } | null = null;
  
  categories = [
    { label: 'All', value: 'all', icon: '🔍' },
    { label: 'Attractions', value: 'attractions', icon: '🏛️' },
    { label: 'Restaurants', value: 'restaurants', icon: '🍽️' },
    { label: 'Museums', value: 'museums', icon: '🖼️' },
    { label: 'Parks', value: 'parks', icon: '🌳' },
    { label: 'Shopping', value: 'shopping', icon: '🛍️' }
  ];
  
  selectedCategory = 'all';
  selectedDistance = 5;
  loading = false;
  places: Place[] = [];
  selectedPlace: Place | null = null;
  
  // Mock images for demonstration
  private mockImages = [
    'https://images.unsplash.com/photo-1499678329028-101435549a4e',
    'https://images.unsplash.com/photo-1503220317375-aaad61436b1b',
    'https://images.unsplash.com/photo-1503917988258-f87a78e3c995',
    'https://images.unsplash.com/photo-1514565131-fce0801e5785',
    'https://images.unsplash.com/photo-1519677100203-a0e668c92439'
  ];
  
  constructor(private apiService: ApiService) {}
  
  ngOnInit(): void {
    if (this.locationCoordinates) {
      this.fetchNearbyPlaces();
    }
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['locationCoordinates'] && this.locationCoordinates) {
      this.fetchNearbyPlaces();
    }
  }
  
  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.fetchNearbyPlaces();
  }
  
  onDistanceChange(): void {
    this.fetchNearbyPlaces();
  }
  
  fetchNearbyPlaces(): void {
    if (!this.locationCoordinates) {
      return;
    }
    
    this.loading = true;
    
    // In a real application, use the ApiService to get data from backend
    // this.apiService.getNearbyPlaces(this.locationCoordinates, this.selectedCategory, this.selectedDistance).subscribe(...)
    
    // For demo purposes, simulate API call with timeout
    setTimeout(() => {
      this.loading = false;
      
      // Generate mock places based on coordinates and filters
      this.places = this.generateMockPlaces();
    }, 1500);
  }
  
  showPlaceDetails(place: Place): void {
    this.selectedPlace = {...place};
    
    // In a real application, you might fetch additional details here
    if (!this.selectedPlace.fullDescription) {
      this.selectedPlace.fullDescription = this.generateMockFullDescription(place);
    }
  }
  
  closeModal(): void {
    this.selectedPlace = null;
  }
  
  private generateMockPlaces(): Place[] {
    const mockPlaces: Place[] = [];
    const numPlaces = Math.floor(Math.random() * 6) + 5; // 5-10 places
    
    for (let i = 0; i < numPlaces; i++) {
      const categoryIndex = Math.floor(Math.random() * (this.categories.length - 1)) + 1;
      const category = this.categories[categoryIndex].value;
      
      // Skip if filtering by category and this doesn't match
      if (this.selectedCategory !== 'all' && category !== this.selectedCategory) {
        continue;
      }
      
      const distance = +(Math.random() * this.selectedDistance).toFixed(1);
      
      // Only include places within the selected distance
      if (distance > this.selectedDistance) {
        continue;
      }
      
      const imageIndex = Math.floor(Math.random() * this.mockImages.length);
      
      mockPlaces.push({
        id: `place-${i}`,
        name: this.getMockName(category),
        description: this.getMockDescription(category),
        category: this.categories[categoryIndex].label,
        distance: distance,
        image: `${this.mockImages[imageIndex]}?w=600&h=400&fit=crop`,
        mapUrl: this.locationCoordinates ? 
          `https://www.google.com/maps/search/?api=1&query=${this.locationCoordinates.latitude},${this.locationCoordinates.longitude}` : 
          '#',
        openingHours: '9:00 AM - 6:00 PM',
        website: 'https://example.com'
      });
    }
    
    // Sort by distance
    return mockPlaces.sort((a, b) => a.distance - b.distance);
  }
  
  private getMockName(category: string): string {
    const attractions = ['Roman Forum', 'Trevi Fountain', 'Spanish Steps', 'Palatine Hill', 'Pantheon'];
    const restaurants = ['Trattoria da Luigi', 'Ristorante Roma', 'La Pergola', 'Il Pastaio', 'Osteria del Tempo Perso'];
    const museums = ['Vatican Museums', 'Capitoline Museums', 'Galleria Borghese', 'National Roman Museum', 'MAXXI'];
    const parks = ['Villa Borghese', 'Villa Doria Pamphili', 'Villa Ada', 'Parco degli Acquedotti', 'Botanical Garden'];
    const shopping = ['Via del Corso', 'Galleria Alberto Sordi', 'Via Condotti', 'Rinascente', 'Porta Portese Market'];
    
    switch (category) {
      case 'attractions': return attractions[Math.floor(Math.random() * attractions.length)];
      case 'restaurants': return restaurants[Math.floor(Math.random() * restaurants.length)];
      case 'museums': return museums[Math.floor(Math.random() * museums.length)];
      case 'parks': return parks[Math.floor(Math.random() * parks.length)];
      case 'shopping': return shopping[Math.floor(Math.random() * shopping.length)];
      default: 
        const all = [...attractions, ...restaurants, ...museums, ...parks, ...shopping];
        return all[Math.floor(Math.random() * all.length)];
    }
  }
  
  private getMockDescription(category: string): string {
    const descriptions = {
      attractions: [
        'A historic site dating back to ancient Rome.',
        'One of the most visited landmarks in the city.',
        'A magnificent example of Roman architecture.'
      ],
      restaurants: [
        'Traditional cuisine with a modern twist.',
        'Family-owned restaurant serving authentic dishes.',
        'Elegant dining with a view of the city.'
      ],
      museums: [
        'Home to an impressive collection of artifacts.',
        'Showcasing art from the Renaissance period.',
        'Interactive exhibits for all ages.'
      ],
      parks: [
        'A peaceful oasis in the heart of the city.',
        'Beautiful gardens with stunning landscaping.',
        'Perfect for a leisurely stroll or picnic.'
      ],
      shopping: [
        'Luxury boutiques and designer stores.',
        'Local artisans selling handcrafted goods.',
        'Popular shopping district with cafes and restaurants.'
      ]
    };
    
    const options = descriptions[category as keyof typeof descriptions] || [
      'A must-visit location during your stay.',
      'Popular among both locals and tourists.',
      'One of the gems of the city.'
    ];
    
    return options[Math.floor(Math.random() * options.length)];
  }
  
  private generateMockFullDescription(place: Place): string {
    return `${place.name} is one of the most notable places in this area. ${place.description} 
    
    Visitors come from all over the world to experience its unique atmosphere and historical significance. The site features exceptional examples of architecture and craftsmanship that have stood the test of time.
    
    Whether you're interested in history, culture, or simply enjoying the ambiance, ${place.name} offers something for everyone. It's particularly beautiful during the morning hours when the lighting is perfect for photography.
    
    Local tip: Visit on weekdays to avoid the crowds and take your time exploring all the hidden corners.`;
  }
}