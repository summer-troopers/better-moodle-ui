import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/Observable';
import { takeUntil, catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { StudentsService } from '@modules/students/students.service';
import { Alert, AlertType } from '@shared/models/alert';

@Component({
  selector: 'app-delete-student-modal',
  templateUrl: './delete-student-modal.component.html',
  styleUrls: ['./delete-student-modal.component.scss']
})
export class DeleteStudentModalComponent implements OnInit {
  @Input()
  studentId: number;

  @Input()
  parent: StudentDetailsPageComponent;

  modalRef: BsModalRef;
  destroy$: Subject<boolean> = new Subject<boolean>();

  studentId: number;

  alerts: Alert[] = [];

  constructor(private modalService: BsModalService,
    private studentsService: StudentsService) { }

  ngOnInit() {

  }

  confirm() {
    this.studentsService.deleteStudent(this.studentId)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          this.alerts.push({ type: AlertType.Error, message: error });
          return Observable.throw(error);
        })
      )
      .subscribe(() => {
        this.bsModalRef.hide();
        this.router.navigate(['students']);
      });
  }

  decline() {
    this.modalRef.hide();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
