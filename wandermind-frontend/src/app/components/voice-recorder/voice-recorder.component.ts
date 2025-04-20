import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

// Import Material modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-voice-recorder',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './voice-recorder.component.html',
  styleUrls: ['./voice-recorder.component.scss']
})
export class VoiceRecorderComponent {
  @Output() queryTranscribed = new EventEmitter<string>();
  
  isRecording = false;
  isProcessing = false;
  isEditing = false;
  isProcessed = false;
  transcription: string = '';
  recordingTime = 0;
  visualizationWaves = Array(15).fill(0);
  
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private recordingTimer: any;
  
  constructor(private apiService: ApiService) {}
  
  startRecording(): void {
    if (this.isRecording) {
      return;
    }
    
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.isRecording = true;
        this.recordingTime = 0;
        this.audioChunks = [];
        
        // Start recording timer
        this.recordingTimer = setInterval(() => {
          this.recordingTime++;
          
          // Auto-stop after 30 seconds
          if (this.recordingTime >= 30) {
            this.stopRecording();
          }
        }, 1000);
        
        // Create media recorder
        this.mediaRecorder = new MediaRecorder(stream);
        
        // Handle data available event
        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.audioChunks.push(event.data);
          }
        };
        
        // Handle recording stop event
        this.mediaRecorder.onstop = () => {
          // Stop all audio tracks
          stream.getTracks().forEach(track => track.stop());
          
          this.isRecording = false;
          clearInterval(this.recordingTimer);
          
          this.processRecording();
        };
        
        // Start recording
        this.mediaRecorder.start();
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
        alert('Could not access microphone. Please ensure you have granted microphone permissions.');
      });
  }
  
  stopRecording(): void {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
    }
  }
  
  processRecording(): void {
    if (this.audioChunks.length === 0) {
      return;
    }
    
    this.isProcessing = true;
    
    // Create audio blob from chunks
    const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
    
    // In a real application, send audioBlob to backend for processing with Whisper
    // this.apiService.transcribeAudio(audioBlob).subscribe(...)
    
    // For demo purposes, simulate API call with timeout
    setTimeout(() => {
      this.isProcessing = false;
      
      // Mock transcription (would come from API in real application)
      this.transcription = "What are some historical landmarks near me and what's their significance?";
    }, 2000);
  }
  
  clearRecording(): void {
    this.transcription = '';
    this.isProcessed = false;
    this.isEditing = false;
  }
  
  enableEditing(): void {
    this.isEditing = true;
  }
  
  saveEdit(): void {
    this.isEditing = false;
  }
  
  submitQuery(): void {
    if (!this.transcription) {
      return;
    }
    
    this.isProcessed = true;
    this.queryTranscribed.emit(this.transcription);
  }
}