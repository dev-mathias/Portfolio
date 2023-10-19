import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlmodaleComponent } from './controlmodale.component';

describe('ControlmodaleComponent', () => {
  let component: ControlmodaleComponent;
  let fixture: ComponentFixture<ControlmodaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlmodaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlmodaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
