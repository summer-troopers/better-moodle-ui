import { Component, OnDestroy, OnInit } from '@angular/core';

import { GroupsService } from '@modules/groups/groups.service';
import { Group } from '@shared/models/group';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent implements OnInit, OnDestroy {

  groups: Array<Group> = [];
  subscription: Subscription;

  constructor(private groupsService: GroupsService) {
  }

  ngOnInit() {
    this.subscription = this.groupsService.getGroups().subscribe((groups: Array<Group>) => this.groups = groups);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
