import { Component, OnInit } from '@angular/core';

import { CrudService } from '@shared/services/crud/crud.service';
import { TEACHERS_URL, STUDENTS_URL, ADMINS_URL } from '@shared/constants'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  totalAdmins: any;
  totalTeachers: any;
  totalStudents: any;

  constructor(private crud: CrudService) { }

  ngOnInit() {
    this.getAllStudents();
    this.getAllTeachers();
  }

  getAllTeachers() {
    return this.crud.getItems(TEACHERS_URL, 0, 999).subscribe(
      teacher => {
        this.totalTeachers = teacher.length;
      }
    );
  }

  getAllStudents() {
    return this.crud.getItems(STUDENTS_URL, 0, 999).subscribe(
      student => {
        this.totalStudents = student.length;
      }
    );
  }
}
