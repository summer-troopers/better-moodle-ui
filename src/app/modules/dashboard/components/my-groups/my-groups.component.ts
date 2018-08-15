import { Component, Input, OnInit } from '@angular/core';
import { CrudService } from '@shared/services/crud/crud.service';
import { GROUPS_URL } from '@shared/constants';
import Group from '@shared/models/group';

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.scss']
})
export class MyGroupsComponent implements OnInit {
  id: string;
  groups: Group;
  @Input() user;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    const userId = this.user.id;
    this.crudService.getItemsofTeacher(GROUPS_URL, userId);
  }
}
