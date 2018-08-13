import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { StudentsService } from '@modules/students/students.service';
import { Alert, AlertType } from '@shared/models/alert';

@Component({
  selector: 'app-delete-student-modal',
  templateUrl: './delete-student-modal.component.html',
  styleUrls: ['./delete-student-modal.component.scss']
})
export class DeleteStudentModalComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  studentId: number;

  alerts: Alert[] = [];

  constructor(public bsModalRef: BsModalRef,
    private studentsService: StudentsService,
    private router: Router) { }

  ngOnInit() {

  }

  confirm() {
    this.studentsService.deleteStudent(this.studentId)
      .pipe(takeUntil(this.destroy$))
      .catch(error => {
        this.alerts.push({ type: AlertType.Error, message: error });
        return Observable.throw(error);
      })
      .subscribe(() => {
        this.bsModalRef.hide();
        this.router.navigate(['students']);
      });
  }

  decline() {
    this.bsModalRef.hide();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
