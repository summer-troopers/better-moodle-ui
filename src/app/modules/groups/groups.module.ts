import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { groupsRoutes } from '@modules/groups/groups.routes';
import { GroupDetailsPageComponent, GroupsPageComponent } from './containers';
import { AddGroupModalComponent } from './components/add-group-modal/add-group-modal.component';
import { EditGroupModalComponent } from './components/edit-group-modal/edit-group-modal.component';
import { SharedModule } from '@shared/shared.module';

const COMPONENTS = [
  EditGroupModalComponent,
  AddGroupModalComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    TypeaheadModule.forRoot(),
    FormsModule,
    SharedModule,
    groupsRoutes
  ],
  entryComponents: [
    ...COMPONENTS
  ],
  declarations: [GroupsPageComponent, GroupDetailsPageComponent, ...COMPONENTS]
})
export class GroupsModule {
}
