import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { groupsRoutes } from '@modules/groups/groups.routes';
import { GroupDetailsPageComponent, GroupsPageComponent } from './containers';
import { SharedModule } from '@shared/shared.module';

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
  declarations: [GroupsPageComponent, GroupDetailsPageComponent]
})
export class GroupsModule {
}
