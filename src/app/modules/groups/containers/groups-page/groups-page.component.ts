import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Group } from '@shared/models/group';
import { GroupsService } from '@modules/groups/groups.service';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  groups: Array<Group> = [];

  constructor(private groupsService: GroupsService) {}

  ngOnInit() {
    this.groupsService.getGroups().pipe(takeUntil(this.destroy$)).subscribe((groups: Array<Group>) => this.groups = groups);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
