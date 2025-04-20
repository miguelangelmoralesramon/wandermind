import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyPlacesComponent } from './nearby-places.component';

describe('NearbyPlacesComponent', () => {
  let component: NearbyPlacesComponent;
  let fixture: ComponentFixture<NearbyPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NearbyPlacesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NearbyPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
