import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { TeachersService } from '../../teachers.service';
import Teacher from '../../../../shared/models/teacher';
import { AddTeacherModalComponent } from '../../modals/add-teacher-modal/add-teacher-modal.component';

@Component({
  selector: 'app-teachers-page',
  templateUrl: './teachers-page.component.html',
  styleUrls: ['./teachers-page.component.scss']
})
export class TeachersPageComponent implements OnInit, OnDestroy {

  private subscription: any;

  modalRef: BsModalRef;

  teachers: Array<Teacher> = [];

  constructor(private teacherService: TeachersService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.subscription = this.teacherService.getTeachers()
      .subscribe(data => this.teachers = data);
  }

  openModal() {
    this.modalRef = this.modalService.show(AddTeacherModalComponent);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getAllTeachers() {
    this.teacherService.getTeachers();
  }
}
