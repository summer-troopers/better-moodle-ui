import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { LocalAlertComponent } from '@shared/componets/alert/local-alert/local-alert.component';
import { AlertComponent } from '@shared/componets/alert/alert.component';
=======
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';

const COMPONENTS = [
  DeleteModalComponent
]
>>>>>>> delete modal-work

@NgModule({
  imports: [
    CommonModule
  ],
<<<<<<< HEAD
  declarations: [LocalAlertComponent, AlertComponent],
  exports: [LocalAlertComponent, AlertComponent]
=======
  entryComponents: [...COMPONENTS],
  declarations: [...COMPONENTS]
>>>>>>> delete modal-work
})
export class SharedModule { }
