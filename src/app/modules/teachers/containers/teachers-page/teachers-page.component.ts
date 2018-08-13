import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil, mergeMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Teacher } from '@shared/models/teacher';
import { AddTeacherModalComponent } from '@teacherModals/add-teacher-modal/add-teacher-modal.component';
import { PaginationParams } from '@shared/models/pagination-params'
import { PaginatorHelperService } from '@shared/services/paginator-helper/paginator-helper.service';
import { Alert, AlertType } from '@shared/models/alert';
import { CrudService } from '@shared/services/crud/crud.service';

@Component({
  selector: 'app-teachers-page',
  templateUrl: './teachers-page.component.html',
  styleUrls: ['./teachers-page.component.scss']
})
export class TeachersPageComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  modalRef: BsModalRef;

  alerts: Alert[] = [];
  defaultItemsNumber: number = 10;
  paginationParams = new PaginationParams(0, this.defaultItemsNumber);
  teachers: Array<Teacher> = [];
  totalItems: number;
  currentPage: number = 1;
  pageParam: number;

  pageUrl: string = 'teachers';

  constructor(private crudService: CrudService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private router: Router,
    private paginatorHelperService: PaginatorHelperService) { }

  ngOnInit() {
    this.initPage();
    this.initNumberOfTeachers();
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.pageParam = +params.page;
      if (this.pageParam != null || this.pageParam !== NaN) {
        if (this.pageParam > 0) {
          this.setPage(this.pageParam);
        } else {
          this.setPage(1);
        }
      } else {
        this.setPage(1);
      }
    });
    this.crudService.getItems(this.pageUrl, this.offset, this.limit).pipe(takeUntil(this.destroy$))
      .subscribe(teachers => this.teachers = teachers);
    this.crudService.getNumberOfItems(this.pageUrl).pipe(takeUntil(this.destroy$))
      .subscribe(teachers => this.totalItems = teachers);
  }

  openAddTeacherModal() {
    this.modalRef = this.modalService.show(AddTeacherModalComponent);
    this.modalRef.content.event
      .subscribe((newTeacher) => {
        this.teachers.unshift(newTeacher)
      })
  }

  initPage() {
    this.route.queryParams.subscribe((params) => {
      this.pageParam = +params.page;
      if (this.pageParam) {
        this.setPage(this.pageParam);
      } else {
        this.setPage(1)
      }
    });
  }

  initNumberOfTeachers() {
    this.crudService.getNumberOfTeachers()
      .pipe(
        mergeMap((teachersNumber) => {
          this.totalItems = +teachersNumber;
          this.paginationParams.offset = this.totalItems - this.defaultItemsNumber;
          return this.crudService.getTeachers(this.paginationParams.offset, this.paginationParams.limit).pipe(takeUntil(this.destroy$));
        }),
        catchError((error) => {
          this.alerts.push({ type: AlertType.Error, message: error });
          return Observable.throw(error);
        })
      )
      .subscribe((teachers) => {
        this.teachers = teachers;
        this.teachers.reverse();
      });
  }

  setPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  pageChanged(event: any) {
    this.currentPage = event.page;

    this.paginationParams = this.paginatorHelperService.getPaginationParams(this.totalItems, this.currentPage);

    this.crudService.getItems(this.paginationParams.offset, this.paginationParams.limit)
      .pipe(takeUntil(this.destroy$))
      .catch(error => {
        this.alerts.push({ type: AlertType.Error, message: error });
        return Observable.throw(error);
      })
      .subscribe((teachers) => {
        this.teachers = teachers;
        this.teachers.reverse();
      });

    this.router.navigate(['teachers'], { queryParams: { page: event.page } });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
