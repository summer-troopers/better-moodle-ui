import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalAlertComponent } from '@shared/componets/alert/local-alert/local-alert.component';
import { AlertComponent } from '@shared/componets/alert/alert.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LocalAlertComponent, AlertComponent],
  exports: [LocalAlertComponent, AlertComponent]
})
export class SharedModule { }
