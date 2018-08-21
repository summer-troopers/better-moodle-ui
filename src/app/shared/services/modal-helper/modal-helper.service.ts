import { Injectable } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalHelperService {

  confirmModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  checkFormForData(form): boolean {
    let hasData = false;
    for (let conontrol in form.controls) {
      if (form.value[conontrol])
        hasData = true;
    }
    return hasData;
  }

}
