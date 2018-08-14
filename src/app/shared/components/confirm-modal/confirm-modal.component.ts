import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html'
})

export class ConfirmModalComponent {
  onConfirm: EventEmitter<any> = new EventEmitter<any>();

  message: string;

  constructor(public bsModalRef: BsModalRef) { }

  confirm() {
    this.onConfirm.emit();
  }

  decline(): void {
    this.bsModalRef.hide();
  }
}
