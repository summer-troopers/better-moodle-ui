import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { TeachersService } from '../../teachers.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-add-teacher-modal',
  templateUrl: './add-teacher-modal.component.html',
  styleUrls: ['./add-teacher-modal.component.scss']
})
export class AddTeacherModalComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  submitted = false;
  private subscription: Subscription;

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


  get formErrors() {
    return this.userForm.controls;
  }

  get firstNameErrors() {
    return this.formErrors.firstName.errors;
  }

  get lastNameErrors() {
    return this.formErrors.lastName.errors;
  }

  get emailErrors() {
    return this.formErrors.email.errors;
  }

  get phoneNumberErrors() {
    return this.formErrors.phoneNumber.errors;
  }

  get passwordErrors() {
    return this.formErrors.password.errors;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    const formParam = this.userForm.value;
    this.subscription = this.teacherService.addTeacher(formParam).subscribe();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
