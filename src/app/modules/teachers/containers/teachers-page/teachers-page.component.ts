import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, throwError } from 'rxjs';
import { takeUntil, mergeMap, catchError } from 'rxjs/operators';

import { Teacher } from '@shared/models/teacher';
import { AddTeacherModalComponent } from '@teacherModals/add-teacher-modal/add-teacher-modal.component';
import { PaginationParams } from '@shared/models/pagination-params';
import { PaginatorHelperService } from '@shared/services/paginator-helper/paginator-helper.service';
import { Alert, AlertType } from '@shared/models/alert';
import { CrudService } from '@shared/services/crud/crud.service';
import { TEACHERS_URL } from '@shared/constants';

@Component({
  selector: 'app-teachers-page',
  templateUrl: './teachers-page.component.html',
  styleUrls: ['./teachers-page.component.scss']
})
export class TeachersPageComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  modalRef: BsModalRef;

  alerts: Alert[] = [];
  defaultItemsNumber = 10;
  paginationParams = new PaginationParams(0, this.defaultItemsNumber);

  teachers: Array<Teacher> = [];
  totalItems: number;
  currentPage = 1;
  pageParam: number;

  constructor(private crudService: CrudService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private router: Router,
    private paginatorHelperService: PaginatorHelperService) { }

  ngOnInit() {
    this.initPage();
    this.initNumberOfTeachers();
  }

  openAddTeacherModal() {
    this.modalRef = this.modalService.show(AddTeacherModalComponent);
    this.modalRef.content.event
      .subscribe((newTeacher) => {
        this.teachers.unshift(newTeacher);
      });
  }

  initPage() {
    this.route.queryParams.subscribe((params) => {
      this.pageParam = +params.page;
      this.paginatorHelperService.getCurrentPage(this.pageParam);
    });
  }

  initNumberOfTeachers() {
    this.crudService.getNumberOfItems(TEACHERS_URL)
      .pipe(
        mergeMap((teachersNumber: number) => {
          this.totalItems = teachersNumber;
          this.paginationParams.offset = this.paginatorHelperService.getOffset(this.totalItems, this.defaultItemsNumber);

          return this.crudService.getItems(TEACHERS_URL, this.paginationParams.offset, this.paginationParams.limit)
            .pipe(takeUntil(this.destroy$));
        }),
        catchError((error) => {
          this.alerts.push({ type: AlertType.Error, message: error });

          return throwError(error);
        })
      )
      .subscribe((teachers) => {
        this.teachers = teachers;
        this.teachers.reverse();
      });
  }

  pageChanged(event: any) {
    this.currentPage = event.page;

    this.paginationParams = this.paginatorHelperService.getPaginationParams(this.totalItems, this.currentPage);

    this.crudService.getItems(TEACHERS_URL, this.paginationParams.offset, this.paginationParams.limit)
      .pipe(takeUntil(this.destroy$),
        catchError(error => {
          this.alerts.push({ type: AlertType.Error, message: error });

          return throwError(error);
        })
      )
      .subscribe((teachers) => {
        this.teachers = teachers;
        this.teachers.reverse();
      });

    this.router.navigate([`${TEACHERS_URL}`], { queryParams: { page: event.page } });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
