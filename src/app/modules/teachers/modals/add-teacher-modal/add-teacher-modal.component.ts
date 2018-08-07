import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TeachersService } from '@teacherService/teachers.service';

@Component({
  selector: 'app-add-teacher-modal',
  templateUrl: './add-teacher-modal.component.html',
  styleUrls: ['./add-teacher-modal.component.scss']
})
export class AddTeacherModalComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  userForm: FormGroup;

  isSubmitted = false;
  message: String;

  constructor(private formBuilder: FormBuilder,
    private teacherService: TeachersService,
    public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
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

    this.teacherService.addTeacher(formParam).pipe(takeUntil(this.destroy$)).subscribe(
      suc => { },
      err => {
        this.message = "Error on adding a new user !!!";
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
