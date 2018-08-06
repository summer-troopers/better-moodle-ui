import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ActivatedRoute, Router } from '@angular/router';

import { TeachersService } from '../../teachers.service';
import Teacher from '@shared/models/teacher';
import { AddTeacherModalComponent } from '../../modals/add-teacher-modal/add-teacher-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-teachers-page',
  templateUrl: './teachers-page.component.html',
  styleUrls: ['./teachers-page.component.scss']
})
export class TeachersPageComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  modalRef: BsModalRef;

  teachers: Array<Teacher> = [];

  offset: number = 0;
  limit: number = 10;
  totalItems: any;
  currentPage: number = 1;
  pageParam: number;

  constructor(private teacherService: TeachersService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
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
    this.subscription = this.teacherService.getTeachers(this.offset, this.limit)
      .subscribe(teachers => this.teachers = teachers);
    this.subscription = this.teacherService.getNumberOfTeachers()
      .subscribe(teachers => this.totalItems = teachers);
  }

  openAddTeacherModal() {
    this.modalRef = this.modalService.show(AddTeacherModalComponent);
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
    this.subscription = this.teacherService.getTeachers(this.offset, this.limit)
      .subscribe(teachers => this.teachers = teachers);
    this.router.navigate(['teachers'], { queryParams: { page: event.page } });
  }
}
