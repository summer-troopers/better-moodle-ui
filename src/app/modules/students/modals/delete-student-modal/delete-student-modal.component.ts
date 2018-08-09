import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
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
  @Input()
  studentId: number;

  @Input()
  parent: StudentDetailsPageComponent;

  modalRef: BsModalRef;
  destroy$: Subject<boolean> = new Subject<boolean>();

  alerts: Alert[] = [];

  constructor(private modalService: BsModalService,
    private studentsService: StudentsService) { }

  ngOnInit() {

  }

  confirm() {
    this.studentsService.deleteStudent(this.studentId)
    this.studentsService.deleteStudent(this.studentsService.id)
      .pipe(takeUntil(this.destroy$))
      .catch(error => {
        this.alerts.push({ type: AlertType.Error, message: error });
        return Observable.throw(error);
      })
      .subscribe();
    this.modalRef.hide();
  }

  openDeleteStudentModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  decline() {
    this.modalRef.hide();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
