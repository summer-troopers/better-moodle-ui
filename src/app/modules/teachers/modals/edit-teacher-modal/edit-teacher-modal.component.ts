import { Component, OnInit, TemplateRef, Input, OnChanges, SimpleChanges } from '@angular/core'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { TeachersService } from '@modules/teachers/teachers.service';
import Teacher from '../../../../shared/models/teacher';

@Component({
  selector: 'app-edit-teacher-modal',
  templateUrl: './edit-teacher-modal.component.html',
  styleUrls: ['./edit-teacher-modal.component.scss']
})
export class EditTeacherModalComponent implements OnInit, OnChanges {

  //@Input('teacher') teacher: Teacher;

  modalRef: BsModalRef;

  userForm: FormGroup;
  submitted = false;

  private subscription: any;
  id: number;
  teacher: Teacher = {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  };

  constructor(private modalService: BsModalService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private teachersService: TeachersService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.teachersService.getTeacher(this.id).subscribe((data) => {
        this.teacher = data;
      })
    });

    this.userForm = this.formBuilder.group({
      firstName: [this.teacher.firstName, Validators.required],
      lastName: [this.teacher.lastName, Validators.required],
      phoneNumber: [this.teacher.phoneNumber, [Validators.required]],
      email: [this.teacher.email, [Validators.required, Validators.email]],
      //password: ['', [Validators.required]]
    });

    this.userForm.patchValue({

    });
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template);
  //   this.userForm = this.formBuilder.group({
  //     firstName: [this.teacher.firstName, Validators.required],
  //     lastName: [this.teacher.lastName, Validators.required],
  //     phoneNumber: [this.teacher.phoneNumber, [Validators.required]],
  //     email: [this.teacher.email, [Validators.required, Validators.email]],
  //     //password: ['', [Validators.required]]
  //   });
  // }

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
    this.teachersService.editTeacher(this.id, formParam).toPromise();
    this.teachersService.getTeachers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
