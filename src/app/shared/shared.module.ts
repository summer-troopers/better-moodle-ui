import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalAlertComponent } from '@shared/componets/alert/local-alert/local-alert.component';
import { AlertComponent } from '@shared/componets/alert/alert.component';

import { DeleteModalComponent } from '@shared/components/delete-modal/delete-modal.component';

const COMPONENTS = [
  DeleteModalComponent
]

@NgModule({
  imports: [
    CommonModule
  ],
  entryComponents: [...COMPONENTS],
  declarations: [...COMPONENTS]
})
export class SharedModule { }
