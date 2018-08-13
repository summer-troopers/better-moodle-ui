import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { takeUntil, mergeMap, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { StudentsService } from '@modules/students/students.service';
import { Student } from '@shared/models/student';
import { Alert, AlertType } from '@shared/models/alert';
@Component({
  selector: 'app-student-details-page',
  templateUrl: './student-details-page.component.html',
  styleUrls: ['./student-details-page.component.scss']
})
export class StudentDetailsPageComponent implements OnInit, OnDestroy {
  id: number;
  student: Student;
  groupName: string;

  destroy$: Subject<boolean> = new Subject<boolean>();

  alerts: Alert[] = [];

  constructor(private route: ActivatedRoute,
    private studentsService: StudentsService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.studentsService.getStudent(this.id)
        .pipe(
          mergeMap((student: Student) => {
            this.student = student;
            return this.studentsService.getStudentsGroup(student.groupId)
              .pipe(takeUntil(this.destroy$));
          }),
          catchError((error) => {
            this.alerts.push({ type: AlertType.Error, message: error });
            return Observable.throw(error);
          })
        )
        .subscribe((groupName) => this.groupName = groupName);
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  openEditModal() {
    const initialState: any = {
      student: this.student
    };
    this.modalRef = this.modalService.show(EditStudentModalComponent, { initialState });

    this.modalRef.content.event
      .pipe(
        mergeMap((updatedStudentData: Student) => {
          this.student = updatedStudentData;
          return this.studentsService.getStudentsGroup(updatedStudentData.groupId)
            .pipe(takeUntil(this.destroy$));
        }),
        catchError((error) => {
          this.alerts.push({ type: AlertType.Error, message: error });
          return Observable.throw(error);
        })
      )
      .subscribe(groupName => this.groupName = groupName);
  }

  openDeleteModal() {
    const initialState: any = {
      studentId: this.id
    };
    this.modalRef = this.modalService.show(DeleteStudentModalComponent, { initialState });
  }

}
