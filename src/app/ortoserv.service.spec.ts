import { TestBed } from '@angular/core/testing';

import { OrtoservService } from './ortoserv.service';

describe('OrtoservService', () => {
  let service: OrtoservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrtoservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
