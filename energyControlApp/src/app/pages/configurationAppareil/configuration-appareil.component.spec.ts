import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationAppareilComponent } from './configuration-appareil.component';

describe('ConfigurationComponent', () => {
  let component: ConfigurationAppareilComponent;
  let fixture: ComponentFixture<ConfigurationAppareilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationAppareilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationAppareilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
