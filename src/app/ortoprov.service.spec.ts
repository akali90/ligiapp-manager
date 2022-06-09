import { TestBed } from '@angular/core/testing';

import { OrtoprovService } from './ortoprov.service';

describe('OrtoprovService', () => {
  let service: OrtoprovService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrtoprovService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
