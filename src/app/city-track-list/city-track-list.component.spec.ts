import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityTrackListComponent } from './city-track-list.component';

describe('CityTrackListComponent', () => {
  let component: CityTrackListComponent;
  let fixture: ComponentFixture<CityTrackListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityTrackListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityTrackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
