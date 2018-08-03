import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TeachersService } from '../../teachers.service';

@Component({
  selector: 'app-add-teacher-modal',
  templateUrl: './add-teacher-modal.component.html',
  styleUrls: ['./add-teacher-modal.component.scss']
})
export class AddTeacherModalComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private teacherService: TeachersService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f() {
    return this.userForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
    console.log('gasgasgas')
    const formParam = this.userForm.value;
    this.teacherService.addTeacher(formParam).toPromise();
  }

}
