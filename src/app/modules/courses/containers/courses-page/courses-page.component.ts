import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject, throwError } from 'rxjs';
import { catchError, mergeMap, takeUntil } from 'rxjs/operators';

import { AddCourseModalComponent } from '@modules/courses/components';
import { Course } from '@shared/models/course';
import { PaginatorHelperService } from '@shared/services/paginator-helper/paginator-helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert, AlertType } from '@shared/models/alert';
import { CrudService } from '@shared/services/crud/crud.service';
import { COURSES_URL, MAX_SIZE_PAGINATION, NUMBER_ITEMS_PAGE, MODAL_OPTIONS } from '@shared/constants';
import { PaginationParams } from '@shared/models/pagination-params';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html'

})
export class CoursesPageComponent implements OnInit, OnDestroy {
  courses: Array<Course> = [];
  totalItems: number;
  currentPage = 1;
  maxSizePagination = MAX_SIZE_PAGINATION;
  paginationParams = new PaginationParams(0, NUMBER_ITEMS_PAGE);

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
    this.initPageData();
  }

  initPageData() {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = this.paginatorHelperService.getCurrentPage(params.page);
      this.initNumberOfCourses();
    });
  }

  getCourses() {
    return this.crudService.getItems(COURSES_URL, this.paginationParams.offset, this.paginationParams.limit)
      .pipe(takeUntil(this.destroy$),
        catchError((error) => {
          this.alerts.push({ type: AlertType.Error, message: error });

          return throwError(error);
        }));
  }

  initNumberOfCourses() {
    this.crudService.getNumberOfItems(COURSES_URL)
      .pipe(
        mergeMap((courseNumber: number) => {
          this.totalItems = courseNumber;
          this.paginationParams = this.paginatorHelperService.getPaginationParams(this.totalItems, this.currentPage);

          return this.getCourses();
        }))
      .subscribe((courses) => {
        this.setCourses(courses);
      });
  }

  openModal() {
    this.modalRef = this.modalService.show(AddCourseModalComponent, MODAL_OPTIONS);

    this.modalRef.content.addItemEvent
      .pipe(takeUntil(this.destroy$))
      .subscribe((course) => {
        this.courses.unshift(course);
        this.alerts.push({ type: AlertType.Success, message: 'The new course is successfully added!' });
      }, error => {
        this.alerts.push({ type: AlertType.Error, message: error });
      });
  }

  pageChanged(event: any) {
    this.currentPage = event.page;
    this.router.navigate([COURSES_URL], { queryParams: { page: event.page } });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  setCourses(courses) {
    this.courses = courses.reverse();
  }
}
