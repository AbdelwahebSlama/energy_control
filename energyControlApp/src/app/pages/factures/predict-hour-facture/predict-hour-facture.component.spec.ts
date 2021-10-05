import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictHourFactureComponent } from './predict-hour-facture.component';

describe('PredictHourFactureComponent', () => {
  let component: PredictHourFactureComponent;
  let fixture: ComponentFixture<PredictHourFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredictHourFactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictHourFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
