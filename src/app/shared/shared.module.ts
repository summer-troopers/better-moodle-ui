import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

import { LocalAlertComponent } from '@shared/components/alert/local-alert/local-alert.component';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { UserRoleDirective } from '@shared/directives/user-role.directive';

import { DefaultModalComponent } from './components/default-modal/default-modal.component';
import { GlobalModalComponent } from './components/global-modal/global-modal.component';

const COMPONENTS = [
  LocalAlertComponent,
  AlertComponent
];

const MODALS = [
  ConfirmModalComponent,
  DefaultModalComponent,
  GlobalModalComponent
];

const DIRECTIVES = [
  UserRoleDirective
];
@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [...MODALS],
  declarations: [...COMPONENTS, ...MODALS, ...DIRECTIVES],
  exports: [...COMPONENTS, ...DIRECTIVES]
})
export class SharedModule { }
