import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { EditCourseModalComponent } from '@modules/courses/components';
import { Alert, AlertType } from '@shared/models/alert';
import Course from '@shared/models/course';
import { CrudService } from '@shared/services/crud/crud.service';
import { COURSES_URL } from '@shared/constants';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-course-details-page',
  templateUrl: './course-details-page.component.html',
  styleUrls: ['./course-details-page.component.scss']
})
export class CourseDetailsPageComponent implements OnInit, OnDestroy {

  course: Course;
  id: string;
  destroy$: Subject<boolean> = new Subject<boolean>();

  modalRef: BsModalRef;

  alerts: Alert[] = [];

  constructor(
    private crudService: CrudService,
    private modalService: BsModalService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.crudService.getItem(COURSES_URL, this.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((course) => {
        this.course = course;
        }, error => {
          this.alerts.push({type: AlertType.Error, message: error});
        });
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  openEditModal() {
    const initialState: any = {
      course: this.course
    };
    this.modalRef = this.modalService.show(EditCourseModalComponent, {initialState});

    this.modalRef.content.editItemEvent
      .pipe(takeUntil(this.destroy$))
      .subscribe((course) => {
        this.course = course;
        this.alerts.push({type: AlertType.Success, message: 'Course was edited!'});
      }, error => {
        this.alerts.push({type: AlertType.Error, message: error});
      });
  }

  openDeleteModal() {
    this.modalRef = this.modalService.show(ConfirmModalComponent);
    this.modalRef.content.onConfirm
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => this.crudService.deleteItem(COURSES_URL, this.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.modalRef.content.afterConfirmAction(COURSES_URL, 'Delete successfully!');
          }, (error) => {
            this.modalRef.content.message = error;
          })
      );
  }
}
