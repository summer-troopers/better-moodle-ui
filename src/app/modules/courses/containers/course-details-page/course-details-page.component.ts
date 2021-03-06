import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject, throwError } from 'rxjs';
import { takeUntil, flatMap, catchError, map } from 'rxjs/operators';

import { Alert, AlertType } from '@shared/models/alert';
import { Course } from '@shared/models/course';
import { CrudService } from '@shared/services/crud/crud.service';
import { COURSES_URL, MODAL_OPTIONS } from '@shared/constants';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { GlobalModalComponent } from '@shared/components/global-modal/global-modal.component';
import { Teacher } from '@shared/models/teacher';

@Component({
  selector: 'app-course-details-page',
  templateUrl: './course-details-page.component.html'
})
export class CourseDetailsPageComponent implements OnInit, OnDestroy {

  course: Course;
  id: string;
  destroy$: Subject<boolean> = new Subject<boolean>();

  modal: BsModalRef;

  alerts: Alert[] = [];

  courseTeachers: Array<Teacher>;

  constructor(
    private crudService: CrudService,
    private modalService: BsModalService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.initPageData();
  }

  initPageData() {
    this.route.params
      .pipe(
        flatMap(params => {
          this.id = params.id;
          return this.crudService.getItem(COURSES_URL, params.id)
            .pipe(catchError(error => {
              this.alerts.push({ type: AlertType.Error, message: error });
              return throwError(error);
            }));
        }),
        takeUntil(this.destroy$)
      ).subscribe((course: any) => {
        this.course = course;
        this.courseTeachers = course.teachers;
      });
  }

  openEditModal() {
    MODAL_OPTIONS['initialState'] = {
      onAdd: false,
      itemType: 'course',
      item: this.course,
      title: 'Edit Course',
      buttonTitle: 'Update Course'
    };
    this.modal = this.modalService.show(GlobalModalComponent, MODAL_OPTIONS);

    this.modal.content.itemEdited
      .pipe(takeUntil(this.destroy$))
      .subscribe((course) => {
        this.course = course;
        this.alerts.push({ type: AlertType.Success, message: 'Course was edited!' });
      }, error => {
        this.alerts.push({ type: AlertType.Error, message: error });
      });
  }

  openDeleteModal() {
    this.modal = this.modalService.show(ConfirmModalComponent);
    this.modal.content.onConfirm.pipe(
      flatMap(() => {
        return this.crudService.deleteItem(COURSES_URL, this.course.id)
          .pipe(
            catchError(
              err => {
                this.modal.content.message = `Error on deleting course!`;
                return throwError(err);
              }));
      }),
      takeUntil(this.destroy$)
    ).subscribe(succ => {
      this.modal.content.afterConfirmAction(COURSES_URL);
      this.alerts.push({ type: AlertType.Success, message: 'Deleted!\nYou will be redirected in a moment!' });
    }, error => {
      this.alerts.push({ type: AlertType.Error, message: error });
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
