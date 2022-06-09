import { TestBed } from '@angular/core/testing';

import { TokengenerateService } from './tokengenerate.service';

describe('TokengenerateService', () => {
  let service: TokengenerateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokengenerateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
