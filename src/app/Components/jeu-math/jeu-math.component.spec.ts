import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeuMathComponent } from './jeu-math.component';

describe('JeuMathComponent', () => {
  let component: JeuMathComponent;
  let fixture: ComponentFixture<JeuMathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JeuMathComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JeuMathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
