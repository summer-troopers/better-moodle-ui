import { TestBed, inject } from '@angular/core/testing';

import { PaginatorHelperService } from './paginator-helper.service';

describe('PaginatorHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaginatorHelperService]
    });
  });

  it('should be created', inject([PaginatorHelperService], (service: PaginatorHelperService) => {
    expect(service).toBeTruthy();
  }));
});
