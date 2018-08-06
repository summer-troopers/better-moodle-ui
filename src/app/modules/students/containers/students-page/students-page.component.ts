import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentsService } from '@modules/students/students.service';
import Student from '@shared/models/student';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { AddStudentModalComponent } from '@modules/students/modals/add-student-modal/add-student-modal.component';

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
      if (this.pageParam != null || this.pageParam != NaN) {
        if (this.pageParam > 0) {
          this.setPage(this.pageParam);
        } else {
          this.setPage(1)
        }
      } else {
        this.setPage(1)
      }
    });
    this.subscription = this.api.getStudents(this.offset, this.limit)
      .subscribe(students => this.students = students);
    this.subscription = this.api.getNumberOfStudents()
      .subscribe(students => this.totalItems = students);
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
    this.offset = this.limit * (event.page - 1);
    this.subscription = this.api.getStudents(this.offset, this.limit)
      .subscribe(students => this.students = students);
    this.router.navigate(['students'], { queryParams: { page: event.page } });
  }
}
