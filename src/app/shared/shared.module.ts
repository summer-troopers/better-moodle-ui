import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalAlertComponent } from '@shared/componets/alert/local-alert/local-alert.component';
import { AlertComponent } from '@shared/componets/alert/alert.component';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';

const COMPONENTS = [
  ConfirmModalComponent,
  AlertComponent,
  LocalAlertComponent
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class SharedModule { }
