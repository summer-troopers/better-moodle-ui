import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TeachersService } from '../../teachers.service';

@Component({
  selector: 'app-add-teacher-modal',
  templateUrl: './add-teacher-modal.component.html',
  styleUrls: ['./add-teacher-modal.component.scss']
})
export class AddTeacherModalComponent implements OnInit {

  modalRef: BsModalRef;

  contactForm: FormGroup;
  submitted = false;

  constructor(private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private teacherService: TeachersService) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    }

    const formParam = this.contactForm.value;
    this.teacherService.addTeacher(formParam).toPromise();
    this.teacherService.getTeachers();

    //console.log(JSON.stringify(this.contactForm.value))
  }

}
