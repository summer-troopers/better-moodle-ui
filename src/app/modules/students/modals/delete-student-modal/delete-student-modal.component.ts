import { Component, OnInit, TemplateRef, OnDestroy, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { StudentsService } from '@modules/students/students.service';

@Component({
  selector: 'app-delete-student-modal',
  templateUrl: './delete-student-modal.component.html',
  styleUrls: ['./delete-student-modal.component.scss']
})
export class DeleteStudentModalComponent implements OnInit {
  alerts: Array<any> = [];

  constructor(public bsModalRef: BsModalRef,
    private studentsService: StudentsService) { }

  ngOnInit() {

  }

  confirm() {
    this.studentsService.deleteStudent(this.studentsService.id)
      .catch(error => {
        this.alerts.push({ type: "danger", msg: error.message });
        return Observable.throw(error.message);
      })
      .subscribe();
    this.bsModalRef.hide();
  }

  decline() {
    this.bsModalRef.hide();
  }

}
