import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnfoundWordComponent } from './unfound-word.component';

describe('UnfoundWordComponent', () => {
  let component: UnfoundWordComponent;
  let fixture: ComponentFixture<UnfoundWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnfoundWordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnfoundWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
