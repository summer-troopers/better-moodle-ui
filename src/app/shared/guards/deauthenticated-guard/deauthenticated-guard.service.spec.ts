import { TestBed, inject } from '@angular/core/testing';

import { DeauthenticatedGuardService } from './deauthenticated-guard.service';

describe('DeauthenticatedGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeauthenticatedGuardService]
    });
  });

  it('should be created', inject([DeauthenticatedGuardService], (service: DeauthenticatedGuardService) => {
    expect(service).toBeTruthy();
  }));
});
