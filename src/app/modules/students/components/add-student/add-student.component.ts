import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendApiService } from '@core/services/api/backend-api.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  studentForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private api: BackendApiService) { }

  ngOnInit() {
    this.studentForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]]
    });
  }

  get f() {
    return this.studentForm.controls;
  }

}
