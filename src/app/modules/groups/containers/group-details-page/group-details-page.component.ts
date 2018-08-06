import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GroupsService } from '@modules/groups/groups.service';
import { SpecialtiesService } from '@modules/specialties/specialties.service';
import { Group } from '@shared/models/group';
import { Specialty } from '@shared/models/specialty';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-group-details-page',
  templateUrl: './group-details-page.component.html',
  styleUrls: ['./group-details-page.component.scss']
})
export class GroupDetailsPageComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  id: string;
  isEditable = false;
  group: Group;
  specialty: Specialty;

  constructor(private route: ActivatedRoute, private groupsService: GroupsService, private specialtiesService: SpecialtiesService) {
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.id = params.id;
      this.groupsService.getGroup(this.id).pipe(takeUntil(this.destroy$)).subscribe((element) => {
        this.group = element;
        this.specialtiesService.getSpecialty(this.group.idSpecialty).pipe(takeUntil(this.destroy$)).subscribe((elementSp) => {
          this.specialty = elementSp;
        });
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  deleteGroup() {
    this.groupsService.deleteGroup(this.id).toPromise();
  }
}
