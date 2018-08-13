import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Teacher } from '@shared/models/teacher';
import { EditTeacherModalComponent } from '@teacherModals/edit-teacher-modal/edit-teacher-modal.component';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { CrudService } from '@shared/services/crud/crud.service';
import { Alert, AlertType } from '@shared/models/alert';
import { TEACHERS_URL } from '@shared/constants/index';

@Component({
  selector: 'app-teacher-details-page',
  templateUrl: './teacher-details-page.component.html'
})
export class TeacherDetailsPageComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  modal: BsModalRef;
  alerts: Alert[] = [];
  id: string;
  teacher: Teacher;
  message: string;

  constructor(private route: ActivatedRoute,
    private crudService: CrudService,
    private modalService: BsModalService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.id = params['id'];
      this.crudService.getItem(TEACHERS_URL, this.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          this.teacher = data;
        });
    });
  }

  openEditModal() {
    const initialState: any = {
      teacher: this.teacher
    };
    this.modal = this.modalService.show(EditTeacherModalComponent, { initialState });
    this.modal.content.event
      .pipe(takeUntil(this.destroy$))
      .subscribe((teacher) => {
        this.teacher = teacher;
        this.alerts.push({ type: AlertType.Success, message: 'Teacher was edited!' });
      }, error => {
        this.alerts.push({ type: AlertType.Error, message: error });
      });
  }

  openDeleteModal() {
    this.modal = this.modalService.show(ConfirmModalComponent);
    this.modal.content.onConfirm.pipe(takeUntil(this.destroy$)).subscribe(
      () => this.crudService.deleteItem(TEACHERS_URL, this.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (suc) => {
            this.modal.content.message = 'Successfully deleted';
            setTimeout(() => {
              this.modal.hide();
              this.router.navigate([TEACHERS_URL]);
            }, 2000);
          },
          (err) => {
            this.modal.content.message = 'Error on delete';
          }
        ),
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
