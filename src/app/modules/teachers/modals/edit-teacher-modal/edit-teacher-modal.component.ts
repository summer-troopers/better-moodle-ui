import { Component, OnInit, TemplateRef } from '@angular/core'
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
export class EditTeacherModalComponent implements OnInit {

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
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      //password: ['', [Validators.required]]
    });

    this.subscription = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.teachersService.getTeacher(this.id).subscribe((data) => {
        this.teacher = data;
      })
    });
  }

  openModal(template: TemplateRef<any>) {
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
    this.teachersService.editTeacher(this.id, formParam).toPromise();
    this.teachersService.getTeachers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
