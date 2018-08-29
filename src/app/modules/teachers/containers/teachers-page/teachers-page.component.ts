import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, mergeMap, takeUntil } from 'rxjs/operators';

import { Teacher } from '@shared/models/teacher';
import { GlobalModalComponent } from '@shared/components/global-modal/global-modal.component';
import { PaginationParams } from '@shared/models/pagination-params';
import { PaginatorHelperService } from '@shared/services/paginator-helper/paginator-helper.service';
import { Alert, AlertType } from '@shared/models/alert';
import { CrudService } from '@shared/services/crud/crud.service';
import { MODAL_OPTIONS, NUMBER_ITEMS_PAGE, TEACHERS_URL, MAX_SIZE_PAGINATION } from '@shared/constants';

@Component({
  selector: 'app-teachers-page',
  templateUrl: './teachers-page.component.html'
})
export class TeachersPageComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  modalRef: BsModalRef;

  alerts: Alert[] = [];
  paginationParams = new PaginationParams(0, NUMBER_ITEMS_PAGE);
  MAX_SIZE_PAGINATION = MAX_SIZE_PAGINATION;

  teachers: Array<Teacher> = [];
  totalItems: number;
  currentPage = 1;

  constructor(private crudService: CrudService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private router: Router,
    private paginatorHelperService: PaginatorHelperService) {
  }

  ngOnInit() {
    this.initPageData();
  }

  openAddTeacherModal() {
    MODAL_OPTIONS['initialState'] = {
      onAdd: true,
      itemType: 'teacher',
      title: 'Add New Teacher',
      buttonTitle: 'Add Teacher'
    };
    this.modalRef = this.modalService.show(GlobalModalComponent, MODAL_OPTIONS);
    this.modalRef.content.itemAdded
      .pipe(takeUntil(this.destroy$))
      .subscribe((newTeacher) => {
        this.teachers.unshift(newTeacher);
        this.alerts.push({ type: AlertType.Success, message: 'New teacher was added!' });
      }, error => {
        this.alerts.push({ type: AlertType.Error, message: error });
      });
  }

  initPageData() {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = this.paginatorHelperService.getCurrentPage(params.page);
      this.initNumberOfTeachers();
    });
  }

  getTeachers(): Observable<Teacher[]> {
    return this.crudService.getItems(TEACHERS_URL, this.paginationParams.offset, this.paginationParams.limit)
      .pipe(takeUntil(this.destroy$),
        catchError((error) => {
          this.alerts.push({ type: AlertType.Error, message: error });

          return throwError(error);
        }));
  }

  initNumberOfTeachers() {
    this.crudService.getNumberOfItems(TEACHERS_URL)
      .pipe(
        mergeMap((teachersNumber: number) => {
          this.totalItems = teachersNumber;
          this.paginationParams = this.paginatorHelperService.getPaginationParams(this.totalItems, this.currentPage);

          return this.getTeachers();
        }))
      .subscribe((teachers) => {
        this.teachers = teachers;
      });
  }

  pageChanged(event: any) {
    this.currentPage = event.page;
    this.router.navigate([TEACHERS_URL], { queryParams: { page: event.page } });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
