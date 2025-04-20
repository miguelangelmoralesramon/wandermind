import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

// Import Material components
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
  @Output() locationIdentified = new EventEmitter<any>();
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  
  isDragOver = false;
  previewUrl: string | null = null;
  selectedFile: File | null = null;
  isAnalyzing = false;
  analysisProgress = 0;
  progressText = '';
  analysisComplete = false;
  showCamera = false;
  
  private stream: MediaStream | null = null;
  
  constructor(private apiService: ApiService) {}
  
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }
  
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }
  
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }
  
  handleFile(file: File): void {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File is too large. Please select an image less than 10MB');
      return;
    }
    
    this.selectedFile = file;
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.previewUrl = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
  
  removeImage(): void {
    this.previewUrl = null;
    this.selectedFile = null;
    this.analysisComplete = false;
  }
  
  analyzeImage(): void {
    if (!this.selectedFile) {
      return;
    }
    
    this.isAnalyzing = true;
    this.analysisProgress = 0;
    this.progressText = 'Uploading image...';
    
    // Mock progress updates for demonstration
    const progressInterval = setInterval(() => {
      if (this.analysisProgress < 95) {
        this.analysisProgress += Math.floor(Math.random() * 10) + 1;
        
        if (this.analysisProgress < 30) {
          this.progressText = 'Uploading image...';
        } else if (this.analysisProgress < 60) {
          this.progressText = 'Analyzing the landmark...';
        } else if (this.analysisProgress < 90) {
          this.progressText = 'Fetching information...';
        } else {
          this.progressText = 'Almost done...';
        }
      }
    }, 300);
    
    // In a real application, use ApiService to send the image to backend
    // this.apiService.analyzeImage(this.selectedFile).subscribe(...)
    
    // For demo purposes, simulate API call with timeout
    setTimeout(() => {
      clearInterval(progressInterval);
      this.analysisProgress = 100;
      this.progressText = 'Analysis complete!';
      this.isAnalyzing = false;
      this.analysisComplete = true;
      
      // Mock location data (would come from API in real application)
      const locationDetails = {
        name: 'Colosseum',
        description: 'An ancient amphitheater in the center of Rome, Italy',
        coordinates: {
          latitude: 41.8902,
          longitude: 12.4922
        },
        history: 'The Colosseum is an oval amphitheatre in the centre of the city of Rome, Italy. It is the largest ancient amphitheatre ever built, and is still the largest standing amphitheatre in the world today, despite its age.',
        culturalSignificance: 'The Colosseum is an iconic symbol of Imperial Rome and is listed as one of the New 7 Wonders of the World.'
      };
      
      this.locationIdentified.emit(locationDetails);
    }, 3000);
  }
  
  openCamera(): void {
    this.showCamera = true;
    
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.stream = stream;
        if (this.videoElement) {
          this.videoElement.nativeElement.srcObject = stream;
        }
      })
      .catch(error => {
        console.error('Error accessing camera:', error);
        alert('Could not access camera. Please ensure you have granted camera permissions.');
        this.closeCamera();
      });
  }
  
  closeCamera(): void {
    this.showCamera = false;
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }
  
  capturePhoto(): void {
    if (!this.videoElement) {
      return;
    }
    
    const video = this.videoElement.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
          this.handleFile(file);
          this.closeCamera();
        }
      }, 'image/jpeg', 0.95);
    }
  }
}