import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ModalHelperService } from '@shared/services/modal-helper/modal-helper.service';

@Component({
  selector: 'app-default-modal',
  templateUrl: './default-modal.component.html'
})
export class DefaultModalComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() form: FormGroup;

  confirmModalRef: BsModalRef;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public modalRef: BsModalRef,
    private modalHelperService: ModalHelperService) {
  }

  ngOnInit() {
  }

  onClose() {
    if (this.form) {
      if (this.modalHelperService.checkFormForData(this.form)) {
        this.confirmModalRef = this.modalHelperService.openConfirmLeaveModal();
        this.confirmModalRef.content.onConfirm.pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.confirmModalRef.hide();
            this.modalRef.hide();
          });
      } else {
        this.modalRef.hide();
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
