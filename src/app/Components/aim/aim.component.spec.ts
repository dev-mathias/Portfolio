import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AimComponent } from './aim.component';

describe('AimComponent', () => {
  let component: AimComponent;
  let fixture: ComponentFixture<AimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
