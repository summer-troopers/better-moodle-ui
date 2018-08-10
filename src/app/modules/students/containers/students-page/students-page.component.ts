import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Observable, Subject } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AddStudentModalComponent } from '@modules/students/modals/add-student-modal/add-student-modal.component';
import { PaginatorHelperService } from '@shared/services/paginator-helper/paginator-helper.service';
import { StudentsService } from '@modules/students/students.service';
import { Student } from '@shared/models/student';
import { PaginationParams } from '@shared/models/pagination-params';
import { Alert, AlertType } from '@shared/models/alert';
@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss']
})
export class StudentsPageComponent implements OnInit, OnDestroy {
  defaultItemsNumber: number = 10;

  paginationParams = new PaginationParams(0, this.defaultItemsNumber);

  totalItems: number;
  currentPage: number = 1;
  pageParam: number;

  alerts: Alert[] = [];
  students: Array<Student> = [];
  modalRef: BsModalRef;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private studentsService: StudentsService,
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
      this.pageParam = +params.page;
      if (this.pageParam) {
        this.setPage(this.pageParam);
      } else {
        this.setPage(1)
      }
    });
  }

  initNumberOfStudents() {
    this.studentsService.getNumberOfStudents()
      .pipe(
        mergeMap((studentsNumber) => {
          this.totalItems = +studentsNumber;
          this.paginationParams.offset = this.totalItems - this.defaultItemsNumber;
          return this.studentsService.getStudents(this.paginationParams.offset, this.paginationParams.limit).pipe(takeUntil(this.destroy$));
        })
      )
      .catch(error => {
        this.alerts.push({ type: AlertType.Error, message: error });
        return Observable.throw(error);
      })
      .subscribe((students) => {
        this.students = students;
        this.students.reverse();
      });
  }

  openAddStudentModal() {
    this.modalRef = this.modalService.show(AddStudentModalComponent);

    this.modalRef.content.event
      .subscribe((newStudent) => {
        this.students.unshift(newStudent)
      })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  setPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  pageChanged(event: any) {
    this.currentPage = event.page;

    this.paginationParams = this.paginatorHelper.getPaginationParams(this.totalItems, this.currentPage);

    this.studentsService.getStudents(this.paginationParams.offset, this.paginationParams.limit)
      .pipe(takeUntil(this.destroy$))
      .catch(error => {
        this.alerts.push({ type: AlertType.Error, message: error });
        return Observable.throw(error);
      })
      .subscribe((students) => {
        this.students = students;
        this.students.reverse();
      });

    this.router.navigate(['students'], { queryParams: { page: event.page } });
  }
}
