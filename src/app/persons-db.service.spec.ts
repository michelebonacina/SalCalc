import { TestBed, inject } from '@angular/core/testing';

import { PersonsService } from './persons-db.service';

describe('PersonsDbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonsService]
    });
  });

  it('should be created', inject([PersonsService], (service: PersonsService) => {
    expect(service).toBeTruthy();
  }));
});
