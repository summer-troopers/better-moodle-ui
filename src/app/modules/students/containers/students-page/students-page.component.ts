import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Observable, Subject, throwError } from 'rxjs';
import { mergeMap, takeUntil, catchError } from 'rxjs/operators';

import { PaginatorHelperService } from '@shared/services/paginator-helper/paginator-helper.service';
import { CrudService } from '@shared/services/crud/crud.service';
import { GlobalModalComponent } from '@shared/components/global-modal/global-modal.component';
import { Student } from '@shared/models/student';
import { PaginationParams } from '@shared/models/pagination-params';
import { Alert, AlertType } from '@shared/models/alert';
import { STUDENTS_URL, NUMBER_ITEMS_PAGE, MODAL_OPTIONS } from '@shared/constants';
@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html'
})
export class StudentsPageComponent implements OnInit, OnDestroy {
  paginationParams = new PaginationParams(0, NUMBER_ITEMS_PAGE);

  totalItems: number;
  currentPage = 1;

  alerts: Alert[] = [];
  students: Array<Student> = [];
  userModalRef: BsModalRef;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private crudService: CrudService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router,
    private paginatorHelper: PaginatorHelperService) { }

  ngOnInit() {
    this.initPageData();
  }

  initPageData() {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = this.paginatorHelper.getCurrentPage(params.page);
      this.initNumberOfStudents();
    });
  }

  initNumberOfStudents() {
    this.crudService.getNumberOfItems(STUDENTS_URL)
      .pipe(
        takeUntil(this.destroy$),
        mergeMap((studentsNumber: number) => {
          this.totalItems = studentsNumber;
          this.paginationParams = this.paginatorHelper.getPaginationParams(this.totalItems, this.currentPage);

          return this.getAllStudents();
        })
      )
      .subscribe((students) => {
        this.setStudents(students);
      });
  }

  openAddStudentModal() {
    MODAL_OPTIONS['initialState'] = {
      onAdd: true,
      itemType: 'student'
    };
    this.userModalRef = this.modalService.show(GlobalModalComponent, MODAL_OPTIONS);
    this.userModalRef.content.itemAdded
      .subscribe((newStudent) => {
        this.students.unshift(newStudent);
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  pageChanged(event: any) {
    this.currentPage = event.page;
    this.router.navigate([STUDENTS_URL], { queryParams: { page: event.page } });
  }

  getAllStudents(): Observable<Array<Student>> {
    return this.crudService.getItems(STUDENTS_URL, this.paginationParams.offset, this.paginationParams.limit)
      .pipe(
        takeUntil(this.destroy$),
        catchError(
          (error) => {
            this.alerts.push({ type: AlertType.Error, message: error });

            return throwError(error);
          })
      );
  }

  setStudents(students) {
    this.students = students.reverse();
  }
}
