import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { groupsRoutes } from '@modules/groups/groups.routes';
import { GroupDetailsPageComponent, GroupsPageComponent } from '@modules/groups/containers';
import { AddGroupComponent } from '@modules/groups/components/add-group/add-group.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    groupsRoutes
  ],
  declarations: [AddGroupComponent, GroupsPageComponent, GroupDetailsPageComponent]
})
export class GroupsModule {
}
