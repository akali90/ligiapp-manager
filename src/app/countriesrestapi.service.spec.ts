import { TestBed } from '@angular/core/testing';

import { CountriesrestapiService } from './countriesrestapi.service';

describe('CountriesrestapiService', () => {
  let service: CountriesrestapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountriesrestapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
