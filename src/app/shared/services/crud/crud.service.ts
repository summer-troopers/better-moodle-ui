import { Injectable } from '@angular/core';
import { BackendApiService } from '@core/services/api/backend-api.service';
import { map, first } from 'rxjs/operators';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private api: BackendApiService) { }

  getNumberOfItems(pageUrl) {
    return this.api.get(pageUrl)
      .pipe(map(result => result.total));
  }

  getItems(offset: number, limit: number, pageUrl: string): Observable<Array<any>> {
    return this.api.get(`${pageUrl}?offset=${offset}&limit=${limit}`)
      .pipe(map(result => result.data));
  }

  getItem(id: string, pageUrl: string): Observable<any> {
    return this.api.get(`${pageUrl}/${id}`)
      .pipe(first());
  }

  deleteItem(id: string, pageUrl: string): Observable<any> {
    return this.api.delete(`${pageUrl}/${id}`).pipe(first());
  }

  addItem(form: any, pageUrl: string): Observable<any> {
    return this.api.post(`${pageUrl}`, form)
      .pipe(map(result => result));
  }

  editItem(form: any, pageUrl: string): Observable<any> {
    return this.api.put(`${pageUrl}/${form.id}`, form)
      .pipe(first());
  }
}
