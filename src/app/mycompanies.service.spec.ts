import { TestBed } from '@angular/core/testing';

import { MycompaniesService } from './mycompanies.service';

describe('MycompaniesService', () => {
  let service: MycompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MycompaniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
