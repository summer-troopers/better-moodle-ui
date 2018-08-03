import { Injectable } from '@angular/core';

import { BackendApiService } from '@core/services/api/backend-api.service';
import { Group } from '@shared/models/group';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private api: BackendApiService) {
  }

  getGroups(): Observable<Array<Group>> {
    return this.api.get(`groups`)
      .pipe(map(result => result.data));
  }

  getGroup(id: string): Observable<Group> {
    return this.api.get(`groups/${id}`)
      .pipe(map(result => result));
  }

  addGroup(newGroup: Group): Observable<any> {
    return this.api.post(`groups`, newGroup);
  }

  updateGroup(id: string, newGroup: Group): Observable<any> {
    return this.api.put(`groups/${id}`, newGroup);
  }

  deleteGroup(id: string): Observable<any> {
    return this.api.delete(`groups/${id}`);
  }
}
