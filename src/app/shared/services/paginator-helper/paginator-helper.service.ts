import { Injectable } from '@angular/core';
import { PaginationParams } from '@shared/models/pagination-params';

@Injectable({
  providedIn: 'root'
})
export class PaginatorHelperService {

  constructor() { }

  getPaginationParams(totalItems: number, selectedPage: number): PaginationParams {
    const limit = 10;
    const select = selectedPage - 1;
    const offset = limit * select;

    return new PaginationParams(limit, offset);
  }

  getCurrentPage(pageParam): number {
    pageParam = +pageParam;
    if (pageParam) {
      return pageParam;
    } else {
      return 1;
    }
  }
}
