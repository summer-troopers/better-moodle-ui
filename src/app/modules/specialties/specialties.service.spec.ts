import { TestBed, inject } from '@angular/core/testing';

import { SpecialtiesService } from './specialties.service';

describe('SpecialtiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecialtiesService]
    });
  });

  it('should be created', inject([SpecialtiesService], (service: SpecialtiesService) => {
    expect(service).toBeTruthy();
  }));
});
