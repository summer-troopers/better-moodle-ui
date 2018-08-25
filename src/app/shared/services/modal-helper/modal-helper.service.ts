import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalHelperService {
  constructor(private modalService: BsModalService) { }

  checkFormForData(form): boolean {
    let hasData = false;
    for (const control in form.controls) {
      if (form.value[control])
        hasData = true;
    }
    return hasData;
  }

  openConfirmLeaveModal() {
    return this.modalService.show(ConfirmModalComponent);
  }

}
