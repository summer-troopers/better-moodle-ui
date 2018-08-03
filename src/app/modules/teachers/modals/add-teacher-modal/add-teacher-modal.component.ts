import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TeachersService } from '../../teachers.service';
import { Template } from '../../../../../../node_modules/@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-add-teacher-modal',
  templateUrl: './add-teacher-modal.component.html',
  styleUrls: ['./add-teacher-modal.component.scss']
})
export class AddTeacherModalComponent implements OnInit {

  modalRef: BsModalRef;

  userForm: FormGroup;
  submitted = false;

  @Output() selectedModal = new EventEmitter<any>()

  constructor(private modalService: BsModalService,
    private formBuilder: FormBuilder,
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

  onModalButtonClick(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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

    const formParam = this.userForm.value;
    this.teacherService.addTeacher(formParam).toPromise();
    this.teacherService.getTeachers();

    //console.log(JSON.stringify(this.contactForm.value))
  }

}
