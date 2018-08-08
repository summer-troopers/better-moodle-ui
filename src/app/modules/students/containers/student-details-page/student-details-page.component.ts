import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { StudentsService } from '@modules/students/students.service';
import { DeleteStudentModalComponent } from '../../modals/delete-student-modal/delete-student-modal.component';
import { EditStudentModalComponent } from '../../modals/edit-student-modal/edit-student-modal.component';
import { Student } from '@shared/models/student';

@Component({
  selector: 'app-student-details-page',
  templateUrl: './student-details-page.component.html',
  styleUrls: ['./student-details-page.component.scss']
})
export class StudentDetailsPageComponent implements OnInit, OnDestroy {
  id: number;
  student: Student;
  groupName: string;
  private subscription: Subscription;

  alerts: Array<any> = [];

  modalRef: BsModalRef;

  constructor(private route: ActivatedRoute,
    private studentsService: StudentsService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.studentsService.id = this.id;
      this.studentsService.getStudent(this.id)
        .pipe(mergeMap((student: Student) => {
          this.student = student;
          return this.studentsService.getStudentsGroup(student.idGroup);
        }))
        .catch(error => {
          this.alerts.push({ type: "danger", msg: error.message });
          return Observable.throw(error.message);
        })
        .subscribe((groupName) => this.groupName = groupName);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openEditModal() {
    const initialState: any = {
      student: this.student
    };
    this.modalRef = this.modalService.show(EditStudentModalComponent, { initialState });

    this.modalRef.content.event
      .pipe(mergeMap((updatedStudentData: Student) => {
        this.student = updatedStudentData;
        return this.studentsService.getStudentsGroup(updatedStudentData.idGroup);
      }))
      .catch(error => {
        this.alerts.push({ type: "danger", msg: error.message });
        return Observable.throw(error.message);
      })
      .subscribe((groupName) => this.groupName = groupName);
  }

  openDeleteModal() {
    this.modalRef = this.modalService.show(DeleteStudentModalComponent);
  }

}
