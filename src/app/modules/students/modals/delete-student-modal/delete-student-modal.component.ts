import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { StudentsService } from '@modules/students/students.service';
import { StudentDetailsPageComponent } from '@modules/students/containers';


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

  alerts: Array<any> = [];

  constructor(private modalService: BsModalService,
    private studentsService: StudentsService) { }

  ngOnInit() {

  }

  confirm() {
    this.studentsService.deleteStudent(this.studentId)
    this.studentsService.deleteStudent(this.studentsService.id)
      .pipe(takeUntil(this.destroy$))
      .catch(error => {
        this.alerts.push({ type: "danger", msg: error.message });
        return Observable.throw(error.message);
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
