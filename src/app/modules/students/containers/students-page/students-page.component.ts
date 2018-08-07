import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentsService } from '@modules/students/students.service';
import Student from '@shared/models/student';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs';

import { AddStudentModalComponent } from '@modules/students/modals/add-student-modal/add-student-modal.component';
import { mergeMap } from 'rxjs/operators';

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

  errors: Array<any> = [];

  students: Array<Student> = [];
  private subscription: Subscription;

  modalRef: BsModalRef;

  constructor(private api: StudentsService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router) { }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe((params) => {
      this.pageParam = +params.page;
      if (this.pageParam != NaN || this.pageParam != null) {
        if (this.pageParam > 0) {
          this.setPage(this.pageParam);
        } else {
          this.setPage(1)
        }
      } else {
        this.setPage(1)
      }
    });

    this.subscription = this.api.getNumberOfStudents()
      .pipe(
        mergeMap((studentsNumber) => {
          this.totalItems = +studentsNumber;
          this.offset = this.totalItems - 10;
          return this.api.getStudents(this.offset, this.limit);
        })
      )
      .subscribe((students) => {
        this.students = students;
        this.students.reverse();
      });
  }

  openModal() {
    this.modalRef = this.modalService.show(AddStudentModalComponent);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

    this.subscription = this.api.getStudents(this.offset, this.limit)
      .catch(error => {
        this.errors.push(error.message);
        return Observable.throw(error.message);
      })
      .subscribe((students) => {
        this.students = students;
        this.students.reverse();
      });

    this.router.navigate(['students'], { queryParams: { page: event.page } });
  }

  onClosed(dismissedError: any) {
    this.errors = this.errors.filter(error => error !== dismissedError);
  }


}
