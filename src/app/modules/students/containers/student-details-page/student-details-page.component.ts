import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { takeUntil, mergeMap, catchError, flatMap, map } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { CrudService } from '@shared/services/crud/crud.service';
import { EditStudentModalComponent } from '@modules/students/modals/edit-student-modal/edit-student-modal.component';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { Student } from '@shared/models/student';
import { Alert, AlertType } from '@shared/models/alert';
import { STUDENTS_URL, GROUPS_URL } from '@shared/constants';
@Component({
  selector: 'app-student-details-page',
  templateUrl: './student-details-page.component.html'
})
export class StudentDetailsPageComponent implements OnInit, OnDestroy {
  student: Student;
  groupName: string;

  destroy$: Subject<boolean> = new Subject<boolean>();

  alerts: Alert[] = [];

  modalRef: BsModalRef;

  constructor(private route: ActivatedRoute,
    private crudService: CrudService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.initPageData();
  }

  initPageData() {
    this.route.params
      .pipe(
        flatMap(params => {
          return this.crudService.getItem(STUDENTS_URL, params.id)
            .pipe(catchError(error => {
              this.alerts.push({ type: AlertType.Error, message: error });
              return throwError(error);
            }));
        }),
        takeUntil(this.destroy$)
      ).subscribe((student) => {
        this.student = student;
      });
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

    this.modalRef.content.studentEdited
      .pipe(
        takeUntil(this.destroy$),
        mergeMap((updatedStudentData: Student) => {
          this.student = updatedStudentData;
          return this.crudService.getItem(GROUPS_URL, updatedStudentData.groupId.toString())
            .pipe(
              catchError((error) => {
                this.alerts.push({ type: AlertType.Error, message: error });
                return throwError(error);
              })
            );
        }),
        catchError((error) => {
          this.alerts.push({ type: AlertType.Error, message: error });
          return throwError(error);
        })
      )
      .subscribe(group => {
        this.groupName = group.name;
        this.alerts.push({ type: AlertType.Success, message: 'Student data updated!' });
      });
  }

  openDeleteModal() {
    this.modalRef = this.modalService.show(ConfirmModalComponent);
    this.modalRef.content.onConfirm.pipe(
      flatMap(() => {
        return this.crudService.deleteItem(STUDENTS_URL, this.student.id)
          .pipe(
            catchError(
              err => {
                this.modalRef.content.message = `Error on deleting student!`;
                return throwError(err);
              }));
      }),
      takeUntil(this.destroy$)
    ).subscribe(() => this.modalRef.content.afterConfirmAction(STUDENTS_URL, `Student was successfully deleted!`));
  }
}
