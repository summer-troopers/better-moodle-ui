import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { takeUntil, mergeMap, catchError, flatMap, map } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { CrudService } from '@shared/services/crud/crud.service';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { GlobalModalComponent } from '@shared/components/global-modal/global-modal.component';
import { Student } from '@shared/models/student';
import { Alert, AlertType } from '@shared/models/alert';
import { STUDENTS_URL, GROUPS_URL, MODAL_OPTIONS } from '@shared/constants';
@Component({
  selector: 'app-student-details-page',
  templateUrl: './student-details-page.component.html'
})
export class StudentDetailsPageComponent implements OnInit, OnDestroy {
  student: Student;

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
    MODAL_OPTIONS['initialState'] = {
      onAdd: false,
      itemType: 'student',
      item: this.student,
      title: 'Edit Student',
      buttonTitle: 'Update Student'
    };
    this.modalRef = this.modalService.show(GlobalModalComponent, MODAL_OPTIONS);

    this.modalRef.content.itemEdited.pipe(
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
      .subscribe((group) => {
        this.student.group = group;
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
