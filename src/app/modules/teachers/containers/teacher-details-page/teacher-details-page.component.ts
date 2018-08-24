import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject, throwError } from 'rxjs';
import { takeUntil, catchError, flatMap, map } from 'rxjs/operators';

import { Teacher } from '@shared/models/teacher';
import { GlobalModalComponent } from '@shared/components/global-modal/global-modal.component';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { CrudService } from '@shared/services/crud/crud.service';
import { Alert, AlertType } from '@shared/models/alert';
import { TEACHERS_URL, MODAL_OPTIONS } from '@shared/constants';

@Component({
  selector: 'app-teacher-details-page',
  templateUrl: './teacher-details-page.component.html'
})
export class TeacherDetailsPageComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  modal: BsModalRef;
  alerts: Alert[] = [];
  teacher: Teacher;

  constructor(private route: ActivatedRoute,
    private crudService: CrudService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getItem();
  }

  getItem() {
    this.route.params
      .pipe(
        flatMap(params => {
          return this.crudService.getItem(TEACHERS_URL, params.id)
            .pipe(catchError(error => {
              this.alerts.push({ type: AlertType.Error, message: error });
              return throwError(error);
            }));
        }),
        takeUntil(this.destroy$)
      ).subscribe((teacher) => {
        this.teacher = teacher;
      });
  }

  openEditModal() {
    MODAL_OPTIONS['initialState'] = {
      onAdd: false,
      itemType: 'teacher',
      item: this.teacher
    };
    this.modal = this.modalService.show(GlobalModalComponent, MODAL_OPTIONS);
    this.modal.content.itemEdited
      .pipe(takeUntil(this.destroy$))
      .subscribe((teacher) => {
        this.teacher = teacher;
        this.alerts.push({ type: AlertType.Success, message: 'Teacher was edited!' });
      }, error => {
        this.alerts.push({ type: AlertType.Error, message: error });
      });
  }

  openDeleteModal() {
    this.modal = this.modalService.show(ConfirmModalComponent);
    this.modal.content.onConfirm.pipe(
      flatMap(() => {
        return this.crudService.deleteItem(TEACHERS_URL, this.teacher.id)
          .pipe(
            catchError(
              err => {
                this.modal.content.message = `Error on deleting teacher!`;
                return throwError(err);
              }));
      }),
      takeUntil(this.destroy$)
    ).subscribe(() => this.modal.content.afterConfirmAction(TEACHERS_URL, `Teacher was successfully deleted!`));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
