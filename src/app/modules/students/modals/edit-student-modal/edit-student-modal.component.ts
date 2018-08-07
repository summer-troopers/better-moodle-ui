import { Component, OnInit, TemplateRef, OnDestroy, Input } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mergeMap } from 'rxjs/operators';

import { StudentsService } from '@modules/students/students.service';
import { StudentDetailsPageComponent } from '@modules/students/containers';
import Student from '@shared/models/student';

import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-student-modal',
  templateUrl: './edit-student-modal.component.html',
  styleUrls: ['./edit-student-modal.component.scss']
})
export class EditStudentModalComponent implements OnInit, OnDestroy {
  @Input()
  student: Student;

  @Input()
  parent: StudentDetailsPageComponent;

  modalRef: BsModalRef;

  studentForm: FormGroup;
  submitted = false;

  private subscription: any;

  errors: Array<any> = [];

  constructor(private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private studentsService: StudentsService) { }

  ngOnInit() {
    this.studentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      idGroup: ['', Validators.required]
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  get fields() {
    return this.studentForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.studentForm.invalid) {
      return;
    }

    this.studentsService.updateStudentData(this.student.id, this.studentForm.value)
      .catch(error => {
        this.errors.push(error.message);
        return Observable.throw(error.message);
      })
      .subscribe();

    this.parent.student = this.studentForm.value;

    this.modalRef.hide();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClosed(dismissedError: any) {
    this.errors = this.errors.filter(error => error !== dismissedError);
  }

}
