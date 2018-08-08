import { Injectable } from '@angular/core';
import { Observable } from '../../../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginatorHelperService {
  offset: number = 0;
  limit: number = 10;

  constructor() { }

  getPaginationParams(totalItems, selectedPage): Observable<any> {
    return new Observable<any>((observer) => {
      if (totalItems - (this.limit * selectedPage) < 0) {
        this.limit = -(totalItems - (this.limit * selectedPage));
        this.offset = 0;
      } else {
        this.limit = 10;
        this.offset = totalItems - (this.limit * selectedPage);
      }
      observer.next([this.limit, this.offset]);
      observer.complete();
      return {
        unsubscribe() { }
      };
    });
  }
}
