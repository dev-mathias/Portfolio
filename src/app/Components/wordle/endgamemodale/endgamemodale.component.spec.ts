import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndgamemodaleComponent } from './endgamemodale.component';

describe('EndgamemodaleComponent', () => {
  let component: EndgamemodaleComponent;
  let fixture: ComponentFixture<EndgamemodaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndgamemodaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndgamemodaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
