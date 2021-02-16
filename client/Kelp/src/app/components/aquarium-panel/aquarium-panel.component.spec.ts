import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AquariumPanelComponent } from './aquarium-panel.component';

describe('AquariumPanelComponent', () => {
  let component: AquariumPanelComponent;
  let fixture: ComponentFixture<AquariumPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AquariumPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AquariumPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
