import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpModaleComponent } from './help-modale.component';

describe('HelpModaleComponent', () => {
  let component: HelpModaleComponent;
  let fixture: ComponentFixture<HelpModaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpModaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpModaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
