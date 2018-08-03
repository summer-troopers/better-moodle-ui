import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GroupsService } from '@modules/groups/groups.service';
import { SpecialtiesService } from '@modules/specialties/specialties.service';
import { Subscription } from 'rxjs';
import { Group } from '@shared/models/group';
import { Specialty } from '@shared/models/specialty';

@Component({
  selector: 'app-group-details-page',
  templateUrl: './group-details-page.component.html',
  styleUrls: ['./group-details-page.component.scss']
})
export class GroupDetailsPageComponent implements OnInit, OnDestroy {

  id: string;
  group: Group;
  specialty: Specialty;
  isEditable = false;

  subscriptions: Array<Subscription> = [];

  constructor(private route: ActivatedRoute, private groupsService: GroupsService, private specialtiesService: SpecialtiesService) {
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe((params) => {
      this.id = params.id;
      this.subscriptions.push(this.groupsService.getGroup(this.id).subscribe((element) => {
        this.group = element;
        this.subscriptions.push(this.specialtiesService.getSpecialty(this.group.idSpecialty).subscribe((elementSp) => {
          this.specialty = elementSp;
        }));
      }));
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  deleteGroup() {
    this.groupsService.deleteGroup(this.id).toPromise();
  }
}
