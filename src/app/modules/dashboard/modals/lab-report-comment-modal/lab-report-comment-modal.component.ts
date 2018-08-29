import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CrudService } from '@shared/services/crud/crud.service';
import { CONFIRM_MODAL_TIMEOUT, LAB_REPORTS_URL } from '@shared/constants';
import { Alert, AlertType } from '@shared/models/alert';

@Component({
  selector: 'app-labs-comments-for-teacher',
  templateUrl: './lab-report-comment-modal.component.html',
  styleUrls: ['./lab-report-comment-modal.component.scss']
})

export class LabReportCommentModalComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  ratingLimitLab = 0;
  isSubmitted = false;
  comment: FormControl;
  alerts: Array<Alert> = [];
  labReportId: string;

  constructor(public modalRef: BsModalRef,
              private formBuilder: FormBuilder,
              private crudService: CrudService) {
  }

  ngOnInit() {
    this.comment = new FormControl('', Validators.required);
  }

  get commentContent() {
    return this.comment;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.comment.invalid || this.ratingLimitLab === 0) {
      this.alerts.push({type: AlertType.Error, message: `Invalid form!`});
      return;
    }

    const newCommentForm = {
      review: this.comment.value,
      mark: this.ratingLimitLab,
      id: this.labReportId,
    };

    this.crudService.editItem(LAB_REPORTS_URL, newCommentForm)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        success => {
          this.alerts.push({type: AlertType.Success, message: `New comment successfully added!`});
          setTimeout(this.modalRef.hide, CONFIRM_MODAL_TIMEOUT);
        },
        error => {
          this.alerts.push({type: AlertType.Error, message: `Couldn't add new comment!`});
        }
      );
  }
}
