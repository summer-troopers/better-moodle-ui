import { Injectable } from '@angular/core';

import { BackendApiService } from '@core/services/api/backend-api.service';
import { Specialty } from '@shared/models/specialty';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpecialtiesService {

  constructor(private api: BackendApiService) {
  }

  getSpecialties(filter: string = ''): Observable<Array<Specialty>> {
    return this.api.get(`specialties?contains=${filter}`)
      .pipe(map(result => {
        console.log(result);
        return result.data;
      }));
  }

  getSpecialty(id: string): Observable<Specialty> {
    return this.api.get(`specialties/${id}`)
      .pipe(map(result => result));
  }

  addSpecialty(newSpecialty): Observable<any> {
    return this.api.post(`specialties`, newSpecialty)
      .pipe(map(result => result));
  }

  updateSpecialty(id: string, newSpecialty: Specialty): Observable<any> {
    return this.api.put(`groups/${id}`, newSpecialty);
  }

  deleteSpecialty(id: string): Observable<any> {
    return this.api.delete(`groups/${id}`);
  }
}
