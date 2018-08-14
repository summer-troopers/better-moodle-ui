import { Injectable } from '@angular/core';
import { PaginationParams } from '@shared/models/pagination-params';

@Injectable({
  providedIn: 'root'
})
export class PaginatorHelperService {

  constructor() { }

  getOffset(totalItems: number, defaultItemsNumber: number): number {
    return totalItems - defaultItemsNumber;
  }

  getPaginationParams(totalItems: number, selectedPage: number): PaginationParams {
    let offset = 0;
    let limit = 10;
    if (totalItems - (limit * selectedPage) < 0) {
      limit = -(totalItems - (limit * selectedPage));
    } else {
      offset = totalItems - (limit * selectedPage);
    }

    return new PaginationParams(limit, offset);
  }

  getCurrentPage(pageParam: number) {
    pageParam = +pageParam;
    if (pageParam) {
      return pageParam;
    } else {
      return 1;
    }
  }


}
