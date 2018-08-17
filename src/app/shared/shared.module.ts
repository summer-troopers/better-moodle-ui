import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalAlertComponent } from '@shared/components/alert/local-alert/local-alert.component';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { StudentRoleDirective } from '@shared/directives/student-role.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  entryComponents: [ConfirmModalComponent],
  declarations: [LocalAlertComponent, AlertComponent, ConfirmModalComponent, StudentRoleDirective],
  exports: [LocalAlertComponent, AlertComponent, StudentRoleDirective]
})
export class SharedModule { }
