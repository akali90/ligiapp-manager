import { TestBed } from '@angular/core/testing';

import { TransactionalEntitiesService } from './transactional-entities.service';

describe('TransactionalEntitiesService', () => {
  let service: TransactionalEntitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionalEntitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
