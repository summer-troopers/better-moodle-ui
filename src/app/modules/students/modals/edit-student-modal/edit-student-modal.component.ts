import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StudentsService } from '@modules/students/students.service';
import { Student } from '../../../../shared/models/student';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-student-modal',
  templateUrl: './edit-student-modal.component.html',
  styleUrls: ['./edit-student-modal.component.scss']
})
export class EditStudentModalComponent implements OnInit, OnDestroy {
  modalRef: BsModalRef;

  studentForm: FormGroup;
  submitted = false;

  id: number;
  student: Student;

  private subscription: any;

  constructor(private modalService: BsModalService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private api: StudentsService) { }

  ngOnInit() {

    this.subscription = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.api.getStudent(this.id).subscribe((element) => { this.student = element })
    });

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
    this.modalRef
  }

  get fields() {
    return this.studentForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.studentForm.invalid) {
      return;
    }

    this.api.updateStudentData(this.student.id, this.studentForm.value)
      .subscribe((response) => console.log(response));

    this.modalRef.hide();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
