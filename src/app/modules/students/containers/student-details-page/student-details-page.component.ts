import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { takeUntil, mergeMap, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { CrudService } from '@shared/services/crud/crud.service';
import { EditStudentModalComponent } from '@modules/students/modals/edit-student-modal/edit-student-modal.component';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { Student } from '@shared/models/student';
import { Alert, AlertType } from '@shared/models/alert';
import { STUDENTS_URL, GROUPS_URL } from '@shared/constants';
@Component({
  selector: 'app-student-details-page',
  templateUrl: './student-details-page.component.html',
  styleUrls: ['./student-details-page.component.scss']
})
export class StudentDetailsPageComponent implements OnInit, OnDestroy {
  id: string;
  student: Student;
  groupName: string;

  destroy$: Subject<boolean> = new Subject<boolean>();

  alerts: Alert[] = [];

  constructor(private route: ActivatedRoute,
    private crudService: CrudService,
    private modalService: BsModalService,
    private router: Router) { }

  ngOnInit() {
    this.initPageData();
  }

  initPageData() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.crudService.getItem(STUDENTS_URL, this.id)
        .pipe(
          mergeMap((student: Student) => {
            this.student = student;
            return this.crudService.getItem(GROUPS_URL, student.groupId.toString())
              .pipe(
                takeUntil(this.destroy$),
                catchError((error) => {
                  this.alerts.push({ type: AlertType.Error, message: error });
                  return throwError(error)
                })
              );
          }),
          catchError(error => {
            this.alerts.push({ type: AlertType.Error, message: error });
            return Observable.throw(error);
          })
        )
        .subscribe((group) => this.groupName = group.name);
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
          this.alerts.push({ type: AlertType.Success, message: 'Student data updated!' });
          return this.crudService.getItem(GROUPS_URL, updatedStudentData.groupId.toString())
            .pipe(
              takeUntil(this.destroy$),
              catchError((error) => {
                this.alerts.push({ type: AlertType.Error, message: error });
                return throwError(error)
              })
            );
        }),
        catchError((error) => {
          this.alerts.push({ type: AlertType.Error, message: error });
          return Observable.throw(error);
        })
      )
      .subscribe(groupName => this.groupName = groupName);
  }

  openDeleteModal() {
    this.modalRef = this.modalService.show(ConfirmModalComponent);
    this.modalRef.content.onConfirm.pipe(takeUntil(this.destroy$)).subscribe(
      () => this.crudService.deleteItem(STUDENTS_URL, this.id)
        .pipe(
          takeUntil(this.destroy$),
          catchError(error => {
            this.alerts.push({ type: AlertType.Error, message: error });
            return Observable.throw(error);
          })
        )
        .subscribe(() => {
          this.modalRef.hide();
          this.router.navigate(['students'])
        })
    );
  }
}
