import { TestBed } from '@angular/core/testing';

import { ProductServsService } from './product-servs.service';

describe('ProductServsService', () => {
  let service: ProductServsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductServsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
