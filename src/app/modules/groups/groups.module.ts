import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {groupsRoutes} from '@modules/groups/groups.routes';
import {GroupDetailsPageComponent, GroupsPageComponent} from '@modules/groups/containers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddGroupModalComponent } from './components/add-group-modal/add-group-modal.component';
import { ModalModule } from 'ngx-bootstrap';
import { EditGroupModalComponent } from './components/edit-group-modal/edit-group-modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    FormsModule,
    groupsRoutes
  ],
  declarations: [GroupsPageComponent, GroupDetailsPageComponent, AddGroupModalComponent, EditGroupModalComponent]
})
export class GroupsModule {
}
