import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CrudService } from '@shared/services/crud/crud.service';
import { Teacher } from '@shared/models/teacher';
import { EditTeacherModalComponent } from '@teacherModals/edit-teacher-modal/edit-teacher-modal.component';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-teacher-details-page',
  templateUrl: './teacher-details-page.component.html',
  styleUrls: ['./teacher-details-page.component.scss']
})
export class TeacherDetailsPageComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  modal: BsModalRef;

  id: string;
  teacher: Teacher;

  pageUrl: string = 'teachers';

  constructor(private route: ActivatedRoute,
    private crudService: CrudService,
    private modalService: BsModalService) { }

  ngOnInit() {

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.id = params['id'];
      this.crudService.getItem(this.id, this.pageUrl).pipe(takeUntil(this.destroy$)).subscribe((data) => {
        this.teacher = data;
      })
    });
  }

  openEditModal() {
    const initialState: any = {
      teacher: this.teacher
    };

    this.modal = this.modalService.show(EditTeacherModalComponent, { initialState });
  }

  openDeleteModal() {
    const initialState = {
      service: this.crudService,
      id: this.id,
      pageUrl: this.pageUrl
    };

    this.modal = this.modalService.show(ConfirmModalComponent, { initialState });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
