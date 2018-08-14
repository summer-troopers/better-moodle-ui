import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Observable, Subject, throwError } from 'rxjs';
import { mergeMap, takeUntil, catchError } from 'rxjs/operators';

import { AddStudentModalComponent } from '@modules/students/modals/add-student-modal/add-student-modal.component';
import { PaginatorHelperService } from '@shared/services/paginator-helper/paginator-helper.service';
import { CrudService } from '@shared/services/crud/crud.service';
import { Student } from '@shared/models/student';
import { PaginationParams } from '@shared/models/pagination-params';
import { Alert, AlertType } from '@shared/models/alert';
import { STUDENTS_URL } from '@shared/constants';
@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss']
})
export class StudentsPageComponent implements OnInit, OnDestroy {
  defaultItemsNumber = 10;

  paginationParams = new PaginationParams(0, this.defaultItemsNumber);

  totalItems: number;
  currentPage = 1;
  pageParam: number;

  alerts: Alert[] = [];
  students: Array<Student> = [];
  modalRef: BsModalRef;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private crudService: CrudService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router,
    private paginatorHelper: PaginatorHelperService) { }

  ngOnInit() {
    this.initPage();
    this.initNumberOfStudents();
  }

  initPage() {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = this.paginatorHelper.getCurrentPage(params.page);
      this.router.navigate([STUDENTS_URL], { queryParams: { page: this.currentPage } });
    });
  }

  initNumberOfStudents() {
    this.crudService.getNumberOfItems(STUDENTS_URL)
      .pipe(
        mergeMap((studentsNumber: number) => {
          this.totalItems = studentsNumber;
          this.paginationParams.offset = this.paginatorHelper.getOffset(this.totalItems, this.defaultItemsNumber);
          return this.getAllStudents();
        }),
        catchError((error) => {
          this.alerts.push({ type: AlertType.Error, message: error });
          return throwError(error);
        })
      )
      .subscribe((students) => {
        this.reverseStudents(students);
      });
  }

  openAddStudentModal() {
    this.modalRef = this.modalService.show(AddStudentModalComponent);

    this.modalRef.content.event
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

    this.paginationParams = this.paginatorHelper.getPaginationParams(this.totalItems, this.currentPage);

    this.getAllStudents()
      .subscribe((students) => {
        this.reverseStudents(students);
      });

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

  reverseStudents(students) {
    this.students = students;
    this.students.reverse();
  }
}
