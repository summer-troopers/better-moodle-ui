import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { TeachersService } from '@modules/teachers/teachers.service';
import Teacher from '../../../../shared/models/teacher';
import { EditTeacherModalComponent } from '../../modals/edit-teacher-modal/edit-teacher-modal.component';
import { DeleteTeacherModalComponent } from '../../modals/delete-teacher-modal/delete-teacher-modal.component';

@Component({
  selector: 'app-teacher-details-page',
  templateUrl: './teacher-details-page.component.html',
  styleUrls: ['./teacher-details-page.component.scss']
})
export class TeacherDetailsPageComponent implements OnInit, OnDestroy {
  private subscription: any;
  modalEditRef: BsModalRef;

  id: number;
  teacher: Teacher = {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    userRole: 'teacher'
  };

  constructor(private route: ActivatedRoute,
    private teachersService: TeachersService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.teachersService.id = this.id;
      this.teachersService.getTeacher(this.id).subscribe((data) => {
        this.teacher = data;
      })
    });
  }

  openEditModal() {
    const initialState: any = {
      teacher: this.teacher
    };
    this.modalEditRef = this.modalService.show(EditTeacherModalComponent, { initialState });
  }

  openDeleteModal() {
    this.modalEditRef = this.modalService.show(DeleteTeacherModalComponent);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
