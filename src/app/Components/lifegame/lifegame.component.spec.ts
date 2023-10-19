import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifegameComponent } from './lifegame.component';

describe('LifegameComponent', () => {
  let component: LifegameComponent;
  let fixture: ComponentFixture<LifegameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifegameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifegameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
