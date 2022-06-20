import { TestBed } from '@angular/core/testing';

import { TbInvEnitityService } from './tb-inv-enitity.service';

describe('TbInvEnitityService', () => {
  let service: TbInvEnitityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TbInvEnitityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
