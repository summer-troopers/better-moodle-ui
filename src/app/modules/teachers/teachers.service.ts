import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { BackendApiService } from '@core/services/api/backend-api.service';
import { map, first } from 'rxjs/operators';
import { Observable } from 'rxjs'

import { Teacher } from '@shared/models/teacher';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { TOKEN_STORAGE_KEY } from '@shared/constants/index';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  id: number;
  options = {
    headers: new HttpHeaders({
      "token": this.localStorage.getLocalStorage(TOKEN_STORAGE_KEY)
    })
  }

  constructor(private http: HttpClient,
    private api: BackendApiService,
    private localStorage: LocalStorageService) { }

  getNumberOfTeachers() {
    return this.api.get(`teachers`)
      .pipe(map(result => result.total));
  }

  getTeachers(offset: number, limit: number): Observable<Array<Teacher>> {
    return this.api.get(`teachers?offset=${offset}&limit=${limit}`)
      .pipe(map(result => result.data));
  }

  getTeacher(id: number): Observable<Teacher> {
    return this.api.get(`teachers/${id}`)
      .pipe(first());
  }

  deleteTeacher(id: number): Observable<any> {
    this.id = id;
    return this.api.delete(`teachers/${id}`).pipe(first());
  }

  addTeacher(form: Teacher): Observable<any> {
    return this.api.post(`teachers`, form)
      .pipe(map(result => result));
  }

  editTeacher(form: Teacher): Observable<any> {
    return this.api.put(`teachers/${form.id}`, form)
      .pipe(first());
  }

}
