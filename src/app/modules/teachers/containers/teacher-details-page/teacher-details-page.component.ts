import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TeachersService } from '@modules/teachers/teachers.service';
import { Teacher } from '@shared/models/teacher';
import { EditTeacherModalComponent } from '@teacherModals/edit-teacher-modal/edit-teacher-modal.component';
import { DeleteTeacherModalComponent } from '@teacherModals/delete-teacher-modal/delete-teacher-modal.component';

@Component({
  selector: 'app-teacher-details-page',
  templateUrl: './teacher-details-page.component.html'
})
export class TeacherDetailsPageComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  modalEditRef: BsModalRef;

  id: number;
  teacher: Teacher;

  constructor(private route: ActivatedRoute,
    private teachersService: TeachersService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.id = +params['id'];
      this.teachersService.id = this.id;
      this.teachersService.getTeacher(this.id).pipe(takeUntil(this.destroy$)).subscribe((data) => {
        this.teacher = data;
      });
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
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
