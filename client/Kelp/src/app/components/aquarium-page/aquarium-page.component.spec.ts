import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AquariumPageComponent } from './aquarium-page.component';

describe('AquariumPageComponent', () => {
  let component: AquariumPageComponent;
  let fixture: ComponentFixture<AquariumPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AquariumPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AquariumPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
