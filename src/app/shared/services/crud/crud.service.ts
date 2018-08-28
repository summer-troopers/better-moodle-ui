import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

import { BackendApiService } from '@core/services/api/backend-api.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private api: BackendApiService) { }

  getNumberOfItems(pageUrl: string) {
    return this.api.get(pageUrl)
      .pipe(map((result: HttpResponse<any>) => {
        const { total } = result.body;
        return total;
      }));
  }

  getItems(pageUrl: string, offset?: number, limit?: number): Observable<Array<any>> {
    return this.api.get(pageUrl, { offset, limit })
      .pipe(map((result: HttpResponse<any>) => {
        const { data } = result.body;
        return data;
      }));
  }

  getItem(pageUrl: string, id: string, params?: Object): Observable<any> {
    return this.api.get(`${pageUrl}/${id}`, params)
      .pipe(map((result: HttpResponse<any>) => {
        if (result.headers.has('content-disposition')) {
          return result;
        }
        const { body } = result;
        return body;
      }));
  }

  deleteItem(pageUrl: string, id: string): Observable<any> {
    return this.api.delete(`${pageUrl}/${id}`)
      .pipe(map((result: HttpResponse<any>) => {
        const { body } = result;
        return body;
      }));
  }

  addItem(pageUrl: string, form: any): Observable<any> {
    return this.api.post(`${pageUrl}`, form)
      .pipe(map((result: HttpResponse<any>) => {
        const { body } = result;
        return body;
      }));
  }

  editItem(pageUrl: string, form: any): Observable<any> {
    return this.api.put(`${pageUrl}/${form.id}`, form)
      .pipe(map((result: HttpResponse<any>) => {
        const { body } = result;
        return body;
      }));
  }
}
