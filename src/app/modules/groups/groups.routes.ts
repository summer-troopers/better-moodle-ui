import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {GroupDetailsPageComponent, GroupsPageComponent} from '@modules/groups/containers';

const routes: Routes = [
  {
    path: ':id',
    component: GroupDetailsPageComponent
  },
  {
    path: '',
    component: GroupsPageComponent
  },
];

export const groupsRoutes: ModuleWithProviders = RouterModule.forChild(routes);

