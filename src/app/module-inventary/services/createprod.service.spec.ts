import { TestBed } from '@angular/core/testing';

import { CreateprodService } from './createprod.service';

describe('CreateprodService', () => {
  let service: CreateprodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateprodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
