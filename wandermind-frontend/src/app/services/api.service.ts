import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Base URL for API requests - update with your backend URL
  private apiUrl = 'http://localhost:5000/api';
  
  constructor(private http: HttpClient) { }
  
  /**
   * Analyze an image to identify a location
   * @param imageFile The image file to analyze
   * @returns Observable with location information
   */
  analyzeImage(imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    return this.http.post<any>(`${this.apiUrl}/analyze-image`, formData)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  
  /**
   * Transcribe audio to text
   * @param audioBlob The audio blob to transcribe
   * @returns Observable with transcription result
   */
  transcribeAudio(audioBlob: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    
    return this.http.post<any>(`${this.apiUrl}/transcribe-audio`, formData)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  
  /**
   * Process a query with location context
   * @param query The user's query
   * @param coordinates Optional location coordinates for context
   * @returns Observable with query response
   */
  processQuery(query: string, coordinates?: { latitude: number; longitude: number }): Observable<any> {
    const body = {
      query,
      coordinates
    };
    
    return this.http.post<any>(`${this.apiUrl}/process-query`, body)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  
  /**
   * Get nearby places based on location and filters
   * @param coordinates Location coordinates
   * @param category Category filter
   * @param distance Distance in kilometers
   * @returns Observable with nearby places
   */
  getNearbyPlaces(
    coordinates: { latitude: number; longitude: number },
    category: string = 'all',
    distance: number = 5
  ): Observable<any> {
    const params = {
      latitude: coordinates.latitude.toString(),
      longitude: coordinates.longitude.toString(),
      category,
      distance: distance.toString()
    };
    
    return this.http.get<any>(`${this.apiUrl}/nearby-places`, { params })
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  
  /**
   * Error handling
   * @param error Error object
   * @returns Error observable
   */
  private handleError(error: any) {
    let errorMessage = '';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}