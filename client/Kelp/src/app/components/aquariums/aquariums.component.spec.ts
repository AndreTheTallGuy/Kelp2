import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AquariumsComponent } from './aquariums.component';

describe('AquariumsComponent', () => {
  let component: AquariumsComponent;
  let fixture: ComponentFixture<AquariumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AquariumsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AquariumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
