import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntromodaleComponent } from './intromodale.component';

describe('IntromodaleComponent', () => {
  let component: IntromodaleComponent;
  let fixture: ComponentFixture<IntromodaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntromodaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntromodaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
