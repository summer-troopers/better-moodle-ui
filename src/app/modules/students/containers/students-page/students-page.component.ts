import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Observable, Subject } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AddStudentModalComponent } from '@modules/students/modals/add-student-modal/add-student-modal.component';
import { StudentsService } from '@modules/students/students.service';
import { Student } from '@shared/models/student';

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss']
})
export class StudentsPageComponent implements OnInit, OnDestroy {
  offset: number = 0;
  limit: number = 10;
  totalItems: number;
  currentPage: number = 1;
  pageParam: number;

  alerts: Array<any> = [];
  students: Array<Student> = [];
  modalRef: BsModalRef;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private studentsService: StudentsService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.pageParam = +params.page;
      if (this.pageParam) {
        this.setPage(this.pageParam);
      } else {
        this.setPage(1)
      }
    });

    this.studentsService.getNumberOfStudents()
      .pipe(
        mergeMap((studentsNumber) => {
          this.totalItems = +studentsNumber;
          this.offset = studentsNumber - 10;
          return this.studentsService.getStudents(this.offset, this.limit).pipe(takeUntil(this.destroy$));
        })
      )
      .catch(error => {
        this.alerts.push({ type: "danger", msg: error.message });
        return Observable.throw(error.message);
      })
      .subscribe((students) => {
        this.students = students;
        this.students.reverse();
      });
  }

  openAddStudentModal() {
    this.modalRef = this.modalService.show(AddStudentModalComponent);
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

    if (this.totalItems - (this.limit * event.page) < 0) {
      this.limit = (this.totalItems - (this.limit * event.page)) * -1;
      this.offset = 0;
    } else {
      this.limit = 10;
      this.offset = this.totalItems - (this.limit * event.page);
    }

    this.studentsService.getStudents(this.offset, this.limit)
      .pipe(takeUntil(this.destroy$))
      .catch(error => {
        this.alerts.push({ type: "danger", msg: error.message });
        return Observable.throw(error.message);
      })
      .subscribe((students) => {
        this.students = students;
        this.students.reverse();
      });

    this.router.navigate(['students'], { queryParams: { page: event.page } });
  }
}
