import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AddCourseModalComponent } from '@modules/courses/components';
import Course from '@shared/models/course';
import { PaginatorHelperService } from '@shared/services/paginator-helper/paginator-helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert, AlertType } from '@shared/models/alert';
import { CrudService } from '@shared/services/crud/crud.service';
import { COURSES_URL } from '@shared/constants';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']

})
export class CoursesPageComponent implements OnInit, OnDestroy {
  courses: Array<Course>;
  offset: number = 0;
  limit: number = 10;
  totalItems: any;
  currentPage: number = 1;
  maxSizePagination = 5;

  modalRef: BsModalRef;

  destroy$: Subject<boolean> = new Subject<boolean>();

  alerts: Alert[] = [];

  constructor(
    private crudService: CrudService,
    private modalService: BsModalService,
    private paginatorHelperService: PaginatorHelperService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = this.paginatorHelperService.getCurrentPage(params.page);
    });

    this.getNumberOfCourses();
    this.offset = this.paginatorHelperService.getPaginationParams(this.totalItems, this.currentPage).offset;
    this.crudService.getItems(COURSES_URL, this.offset, this.limit)
      .pipe(takeUntil(this.destroy$))
      .subscribe((courses) => {
        this.courses = courses;
        this.courses.reverse();
      });
  }

  getNumberOfCourses() {
    this.crudService.getNumberOfItems(COURSES_URL)
      .pipe(takeUntil(this.destroy$))
      .subscribe(coursesNumber => {
        this.totalItems = +coursesNumber;
      });
  }

  openModal() {
    this.modalRef = this.modalService.show(AddCourseModalComponent);

    this.modalRef.content.event
      .pipe(takeUntil(this.destroy$))
      .subscribe((course) => {
        this.courses.unshift(course);
        this.alerts.push({type: AlertType.Success, message: 'The new course is successfully added!'});
      }, error => {
        this.alerts.push({type: AlertType.Error, message: error});
      });
  }

  pageChanged(event: any) {
    this.currentPage = event.page;

    this.offset = this.paginatorHelperService.getPaginationParams(this.totalItems, this.currentPage).offset;
    this.limit = this.paginatorHelperService.getPaginationParams(this.totalItems, this.currentPage).limit;

    this.crudService.getItems(COURSES_URL, this.offset, this.limit)
      .pipe(takeUntil(this.destroy$))
      .subscribe((courses) => {
        this.courses = courses;
        this.courses.reverse();
      }, error => {
        this.alerts.push({type: AlertType.Error, message: error});
      });

    this.router.navigate([COURSES_URL], {queryParams: {page: event.page}});
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
