import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CrudService } from '../../../../shared/services/crud/crud.service';
import { Teacher } from '@shared/models/teacher';

@Component({
  selector: 'app-edit-teacher-modal',
  templateUrl: './edit-teacher-modal.component.html',
  styleUrls: ['./edit-teacher-modal.component.scss']
})
export class EditTeacherModalComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  userForm: FormGroup;

  isSubmitted = false;
  teacher: Teacher;

  pageUrl: string = 'teachers';

  constructor(private crudService: CrudService,
    public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      id: new FormControl(this.teacher.id),
      firstName: new FormControl(this.teacher.firstName, Validators.required),
      lastName: new FormControl(this.teacher.lastName, Validators.required),
      email: new FormControl(this.teacher.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.teacher.phoneNumber, Validators.required),
    });
  }

  formErrors(inputName: string) {
    return this.userForm.controls[inputName].errors;
  }

  onSubmit() {
    this.isSubmitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    const formParam = this.userForm.value;
    this.crudService.editItem(formParam, this.pageUrl).pipe(takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
