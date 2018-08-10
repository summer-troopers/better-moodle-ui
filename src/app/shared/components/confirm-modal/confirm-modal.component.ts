import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html'
})
export class ConfirmModalComponent {

  destroy$: Subject<boolean> = new Subject<boolean>();
  deleted: EventEmitter<any> = new EventEmitter<any>();

  message: string;

  constructor(public bsModalRef: BsModalRef,
    private router: Router) { }

  confirm() {
    this.deleted.emit();
  }

  decline(): void {
    this.bsModalRef.hide();
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
