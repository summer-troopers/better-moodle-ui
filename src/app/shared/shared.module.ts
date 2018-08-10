import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalAlertComponent } from '@shared/componets/alert/local-alert/local-alert.component';
import { AlertComponent } from '@shared/componets/alert/alert.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  entryComponents: [ConfirmModalComponent],
  declarations: [LocalAlertComponent, AlertComponent, ConfirmModalComponent],
  exports: [LocalAlertComponent, AlertComponent]
})
export class SharedModule { }
