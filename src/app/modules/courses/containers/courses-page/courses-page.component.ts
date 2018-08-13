import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';

import { AddCourseModalComponent } from '@modules/courses/components';
import { CoursesService } from '@modules/courses/courses.service';
import Course from '@shared/models/course';
import { PaginatorHelperService } from '@shared/services/paginator-helper/paginator-helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert, AlertType } from '@shared/models/alert';

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
  pageParam: number;

  modalRef: BsModalRef;

  destroy$: Subject<boolean> = new Subject<boolean>();

  alerts: Alert[] = [];

  constructor(
    private coursesService: CoursesService,
    private modalService: BsModalService,
    private paginatorHelperService: PaginatorHelperService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.pageParam = +params.page;
      if (this.pageParam) {
        this.setPage(this.pageParam);
      } else {
        this.setPage(1);
      }
    });

    this.coursesService.getNumberOfCourses().pipe(mergeMap((coursesNumber) => {
        this.totalItems = +coursesNumber;
        this.offset = this.totalItems - this.limit;
        return this.coursesService.getCourses(this.offset, this.limit).pipe(takeUntil(this.destroy$));
      })
    )
      .subscribe((students) => {
        this.courses = students;
        this.courses.reverse();
      }, error => {
        this.alerts.push({type: AlertType.Error, message: error});
        return console.error(error);
      });
  }

  setPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  openModal() {
    this.modalRef = this.modalService.show(AddCourseModalComponent);

    this.modalRef.content.event
      .subscribe((course) => {
        this.courses.unshift(course);
      });
  }

  pageChanged(event: any) {
    this.currentPage = event.page;

    this.offset = this.paginatorHelperService.getPaginationParams(this.totalItems, this.currentPage).offset;
    this.limit = this.paginatorHelperService.getPaginationParams(this.totalItems, this.currentPage).limit;

    this.coursesService.getCourses(this.offset, this.limit)
      .pipe(takeUntil(this.destroy$))
      .subscribe((courses) => {
        this.courses = courses;
        this.courses.reverse();
      }, error => {
        this.alerts.push({type: AlertType.Error, message: error});
        return console.error(error);
      });

    this.router.navigate(['courses'], {queryParams: {page: event.page}});
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
