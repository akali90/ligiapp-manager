import { TestBed } from '@angular/core/testing';

import { PopUpModsService } from './pop-up-mods.service';

describe('PopUpModsService', () => {
  let service: PopUpModsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopUpModsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
