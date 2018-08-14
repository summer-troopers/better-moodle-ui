import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';

import { CONFIRM_MODAL_TIMEOUT } from '@shared/constants';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html'
})

export class ConfirmModalComponent {
  onConfirm: EventEmitter<any> = new EventEmitter<any>();

  message: string;

  constructor(private bsModalRef: BsModalRef,
    private router: Router) { }

  confirm() {
    this.onConfirm.emit();
  }

  decline(): void {
    this.bsModalRef.hide();
  }

  afterConfirmAction(url, message) {
    this.message = message;
    setTimeout(() => {
      this.router.navigateByUrl(url);
      this.bsModalRef.hide();
    }, CONFIRM_MODAL_TIMEOUT);
  }
}
