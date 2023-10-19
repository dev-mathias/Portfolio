/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JeuMathService } from './jeuMath.service';

describe('Service: JeuMath', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JeuMathService]
    });
  });

  it('should ...', inject([JeuMathService], (service: JeuMathService) => {
    expect(service).toBeTruthy();
  }));
});
