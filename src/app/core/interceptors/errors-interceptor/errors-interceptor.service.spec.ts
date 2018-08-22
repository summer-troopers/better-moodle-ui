import { TestBed, inject } from '@angular/core/testing';

import { ErrorsInterceptorService } from './errors-interceptor.service';

describe('ErrorsInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorsInterceptorService]
    });
  });

  it('should be created', inject([ErrorsInterceptorService], (service: ErrorsInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
