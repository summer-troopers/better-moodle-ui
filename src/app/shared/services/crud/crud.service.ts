import { Injectable } from '@angular/core';
import { BackendApiService } from '@core/services/api/backend-api.service';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {

  constructor(private api: BackendApiService) {
  }

  getNumberOfItems(pageUrl: string) {
    return this.api.get(pageUrl)
      .pipe(map(result => result.total));
  }

  getItems(pageUrl: string, offset: number, limit: number): Observable<Array<any>> {
    return this.api.get(`${pageUrl}?offset=${offset}&limit=${limit}`)
      .pipe(map(result => result.data));
  }

  getItem(pageUrl: string, id: string, isFile?: boolean): Observable<any> {
    return this.api.get(`${pageUrl}/${id}`, isFile)
      .pipe(map(result => {
        console.log(result.body);
        if (isFile) {
          return {
            data: result.body,
            headers: result.headers
          };
        }
        return result.data;
      }));
  }

  deleteItem(pageUrl: string, id: string): Observable<any> {
    return this.api.delete(`${pageUrl}/${id}`)
      .pipe(first());
  }

  addItem(pageUrl: string, form: any): Observable<any> {
    return this.api.post(`${pageUrl}`, form)
      .pipe(map(result => result));
  }

  editItem(pageUrl: string, form: any): Observable<any> {
    return this.api.put(`${pageUrl}/${form.id}`, form)
      .pipe(first());
  }
}
