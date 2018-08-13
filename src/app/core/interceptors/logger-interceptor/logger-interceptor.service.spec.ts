import { TestBed, inject } from '@angular/core/testing';

import { LoggerInterceptorService } from './logger-interceptor.service';

describe('LoggerInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerInterceptorService]
    });
  });

  it('should be created', inject([LoggerInterceptorService], (service: LoggerInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
