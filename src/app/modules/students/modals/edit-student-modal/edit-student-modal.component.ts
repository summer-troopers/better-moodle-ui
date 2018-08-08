import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { StudentsService } from '@modules/students/students.service';

@Component({
  selector: 'app-edit-student-modal',
  templateUrl: './edit-student-modal.component.html',
  styleUrls: ['./edit-student-modal.component.scss']
})
export class EditStudentModalComponent implements OnInit {

  studentForm: FormGroup;
  submitted = false;

  alerts: Array<any> = [];

  public event: EventEmitter<any> = new EventEmitter();

  constructor(public bsModalRef: BsModalRef,
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

  formErrors(inputName: string) {
    return this.studentForm.controls[inputName].errors;
  }

  onSubmit() {
    this.submitted = true;

    if (this.studentForm.invalid) {
      return;
    }

    this.studentsService.updateStudentData(this.studentsService.id, this.studentForm.value)
      .catch(error => {
        this.alerts.push({ type: "danger", msg: error.message });
        return Observable.throw(error.message);
      })
      .subscribe();

    this.event.emit(this.studentForm.value);
    this.bsModalRef.hide();
  }
}
